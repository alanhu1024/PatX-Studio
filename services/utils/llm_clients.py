"""多种LLM客户端实现"""
import logging
from typing import Dict, Any, Optional, AsyncGenerator, List
from openai import OpenAI, AsyncOpenAI
import httpx
import base64
from config import settings

logger = logging.getLogger(__name__)


class MultiLLMClient:
    """支持多种LLM API的客户端"""
    
    def __init__(self):
        """初始化所有LLM客户端"""
        # 主模型客户端（火山引擎）
        self.main_client = AsyncOpenAI(
            api_key=settings.API_KEY,
            base_url=settings.MODEL_URL
        )
        
        # 通义千问客户端
        self.qwen_client = AsyncOpenAI(
            api_key=settings.QWEN_API_KEY,
            base_url=settings.QWEN_MODEL_URL
        )
        
        # DeepSeek客户端
        self.ds_client = AsyncOpenAI(
            api_key=settings.DS_API_KEY,
            base_url=settings.DS_MODEL_URL
        )
        
        # 图文分析客户端（Gemini）
        self.image_client = AsyncOpenAI(
            api_key=settings.IMAGE_API_KEY,
            base_url=settings.IMAGE_MODEL_URL
        )
        
        # 默认模型
        self.default_model = settings.MODEL_ID_V3
    
    async def process_item(self, prompt: str, model: str = None, **kwargs) -> Dict[str, Any]:
        """
        通用LLM调用接口
        
        Args:
            prompt: 提示词
            model: 模型ID
            **kwargs: 其他参数
            
        Returns:
            包含模型响应的字典
        """
        model = model or self.default_model
        
        # 根据模型选择客户端
        if 'qwen' in model.lower():
            client = self.qwen_client
            extra_body = {
                'enable_thinking': False,
                'repetition_penalty': 1.05
            }
            max_tokens = 16000
        elif 'deepseek-chat' in model.lower():
            client = self.ds_client
            extra_body = {}
            max_tokens = 8000
        elif 'gemini' in model.lower():
            client = self.image_client
            extra_body = {}
            max_tokens = 8000
        else:
            # 默认使用火山引擎
            client = self.main_client
            extra_body = {'repetition_penalty': 1.05}
            max_tokens = 8000
        
        try:
            completion = await client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=kwargs.get('max_tokens', max_tokens),
                temperature=kwargs.get('temperature', 0.7),
                stream=False,
                extra_body=extra_body
            )
            
            text = completion.choices[0].message.content
            return {'model': model, 'prompt': prompt, 'res': text}
            
        except Exception as e:
            logger.error(f"LLM调用失败: {str(e)}")
            return {'model': model, 'prompt': prompt, 'res': str(e)}
    
    async def process_item_streaming(self, prompt: str, model: str = None, system_prompt: str = None):
        """
        流式LLM调用接口
        
        Args:
            prompt: 提示词
            model: 模型ID
            system_prompt: 系统提示词
            
        Yields:
            响应片段
        """
        model = model or self.default_model
        
        # 构建消息
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        # 根据模型选择客户端和参数
        if 'qwen' in model.lower():
            client = self.qwen_client
            extra_body = {
                'enable_thinking': False,
                'repetition_penalty': 1.05
            }
            max_tokens = 16000
        else:
            client = self.main_client
            extra_body = {'repetition_penalty': 1.05}
            max_tokens = 8000
        
        try:
            completion = await client.chat.completions.create(
                model=model,
                messages=messages,
                max_tokens=max_tokens,
                stream=True,
                extra_body=extra_body
            )
            
            async for chunk in completion:
                if hasattr(chunk, "choices") and chunk.choices:
                    delta = chunk.choices[0].delta
                    if delta.content:
                        yield delta.content
                        
        except Exception as e:
            logger.error(f"流式LLM调用失败: {str(e)}")
            yield f"错误: {str(e)}"
    
    async def process_item_image(self, content_list: List[Dict], model: str = None) -> Dict[str, Any]:
        """
        图文分析接口
        
        Args:
            content_list: 包含文本和图片的内容列表
            model: 模型ID（默认使用Gemini）
            
        Returns:
            包含模型响应的字典
        """
        model = model or settings.IMAGE_MODEL_ID
        
        try:
            completion = await self.image_client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "user", "content": content_list}
                ],
                max_tokens=8000,
                stream=False
            )
            
            text = completion.choices[0].message.content
            return {'model': model, 'res': text}
            
        except Exception as e:
            logger.error(f"图文分析失败: {str(e)}")
            return {'model': model, 'res': str(e)}
    
    async def process_document_compare(self, application_text: str, compare_text_dict: dict, 
                                      review_text: str, model: str = None, language: str = "Chinese") -> str:
        """
        文档对比分析
        
        Args:
            application_text: 申请文件内容
            compare_text_dict: 对比文件字典
            review_text: 审查意见
            model: 模型ID
            language: 输出语言
            
        Returns:
            对比分析结果
        """
        model = model or self.default_model
        
        compare_text = ""
        for file_name, text in compare_text_dict.items():
            compare_text += f"""
        文件名称：{file_name}
        文件内容：{text}"""
        
        prompt = f"""
您是一位专业的技术比对专家，擅长识别技术文档间的本质差异。请对所提供的申请文件与对比文件进行系统性背景分析。

<申请文件>
{application_text}
</申请文件>

<对比文件>
{compare_text}
</对比文件>

<审查意见>
{review_text}
</审查意见>

任务：深入比较上述文档的差异，输出详细的技术差异分析报告。
"""
        
        result = await self.process_item(prompt, model)
        return result.get('res', '')


class DocumentProcessor:
    """文档处理器 - 与RAGFlow API交互"""
    
    def __init__(self):
        """初始化文档处理器"""
        self.base_api_url = settings.DOCUMENT_API_URL
        self.api_key = settings.DOCUMENT_API_KEY
        self.upload_url = f"{self.base_api_url}/api/v1/datasets/{{dataset_id}}/documents"
        self.retrieval_url = f"{self.base_api_url}/api/v1/retrieval"
        self.timeout = httpx.Timeout(connect=10.0, read=30.0, write=10.0, pool=5.0)
    
    async def retrieve_documents(self, query: str, dataset_ids: List[str], top_k: int = 5) -> List[Dict]:
        """
        从RAGFlow检索相关文档
        
        Args:
            query: 查询文本
            dataset_ids: 数据集ID列表
            top_k: 返回结果数量
            
        Returns:
            检索结果列表
        """
        try:
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            }
            
            data = {
                'question': query,
                'dataset_ids': dataset_ids,
                'top_k': top_k
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    self.retrieval_url,
                    headers=headers,
                    json=data
                )
                
                if response.status_code == 200:
                    result = response.json()
                    return result.get('data', {}).get('chunks', [])
                else:
                    logger.error(f"文档检索失败: {response.status_code} - {response.text}")
                    return []
                    
        except Exception as e:
            logger.error(f"文档检索异常: {str(e)}")
            return []
    
    async def upload_document(self, dataset_id: str, content: str, filename: str) -> Optional[Dict]:
        """
        上传文档到RAGFlow
        
        Args:
            dataset_id: 数据集ID
            content: 文档内容
            filename: 文件名
            
        Returns:
            上传结果
        """
        try:
            import tempfile
            import os
            
            # 创建临时文件
            with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as temp_file:
                temp_file.write(content)
                temp_path = temp_file.name
            
            # 上传文件
            with open(temp_path, 'rb') as f:
                files = {
                    'file': (filename, f, 'text/plain')
                }
                
                headers = {
                    'Authorization': f'Bearer {self.api_key}'
                }
                
                url = self.upload_url.format(dataset_id=dataset_id)
                
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.post(url, headers=headers, files=files)
                    
                    # 清理临时文件
                    os.unlink(temp_path)
                    
                    if response.status_code == 200:
                        return response.json()
                    else:
                        logger.error(f"文档上传失败: {response.status_code} - {response.text}")
                        return None
                        
        except Exception as e:
            logger.error(f"文档上传异常: {str(e)}")
            return None


def encode_image_to_base64(image_path: str) -> str:
    """
    将图片编码为base64
    
    Args:
        image_path: 图片路径
        
    Returns:
        base64编码的字符串
    """
    try:
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    except Exception as e:
        logger.error(f"图片编码失败: {str(e)}")
        return ""


# 创建全局实例
llm_client = MultiLLMClient()
doc_processor = DocumentProcessor()