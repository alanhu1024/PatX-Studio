"""特征对比分析器"""
from typing import Dict, Optional, List
import logging
import asyncio
import json
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.llm_clients import llm_client, doc_processor
from config import settings

logger = logging.getLogger(__name__)


class FeatureComparator:
    """
    特征对比分析工具
    
    使用多种LLM进行技术特征的智能比对分析
    """
    
    def __init__(self, model_id: str = None):
        """
        初始化特征比对器
        
        Args:
            model_id: 指定使用的模型ID，默认使用配置中的MODEL_ID_V3
        """
        self.llm_client = llm_client
        self.doc_processor = doc_processor
        self.model_id = model_id or settings.MODEL_ID_V3
        
    async def compare(self, 
                     feature_text: str, 
                     compare_content: str, 
                     user_input: str = "",
                     use_rag: bool = False,
                     dataset_ids: List[str] = None) -> Dict:
        """
        执行特征比对分析
        
        Args:
            feature_text: 技术特征文本
            compare_content: 对比文件内容
            user_input: 用户额外需求
            use_rag: 是否使用RAG检索增强
            dataset_ids: RAG数据集ID列表
            
        Returns:
            比对分析结果字典
        """
        try:
            # 如果启用RAG，先检索相关文档
            related_docs = []
            if use_rag and dataset_ids:
                related_docs = await self._retrieve_related_documents(
                    feature_text, dataset_ids
                )
                if related_docs:
                    # 将检索到的文档添加到对比内容中
                    doc_content = self._format_retrieved_docs(related_docs)
                    compare_content = f"{compare_content}\n\n<检索到的相关文档>\n{doc_content}\n</检索到的相关文档>"
            
            # 构建提示词
            prompt = self._build_prompt(feature_text, compare_content, user_input)
            
            # 调用LLM进行分析
            result = await self.llm_client.process_item(prompt, model=self.model_id)
            
            if result.get('res'):
                # 解析LLM响应
                parsed_result = self._parse_result(result['res'])
                parsed_result['model_used'] = result.get('model', self.model_id)
                if related_docs:
                    parsed_result['retrieved_docs'] = len(related_docs)
                return parsed_result
            else:
                # 返回错误信息
                return {
                    'status': 'error',
                    'message': result.get('res', '分析失败'),
                    'similarity': 0.0
                }
                
        except Exception as e:
            logger.error(f"特征比对失败: {str(e)}")
            return {
                'status': 'error',
                'message': str(e),
                'similarity': 0.0
            }
    
    async def compare_with_image(self,
                                feature_text: str,
                                compare_content: str,
                                image_paths: List[str],
                                user_input: str = "") -> Dict:
        """
        执行图文特征比对分析
        
        Args:
            feature_text: 技术特征文本
            compare_content: 对比文件内容
            image_paths: 图片路径列表
            user_input: 用户额外需求
            
        Returns:
            比对分析结果字典
        """
        try:
            from utils.llm_clients import encode_image_to_base64
            
            # 构建包含图片的内容
            content_list = []
            
            # 添加文本提示
            prompt = self._build_prompt(feature_text, compare_content, user_input)
            content_list.append({"type": "text", "text": prompt})
            
            # 添加图片
            for image_path in image_paths:
                base64_image = encode_image_to_base64(image_path)
                if base64_image:
                    content_list.append({
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    })
            
            # 调用图文分析API
            result = await self.llm_client.process_item_image(
                content_list, 
                model=settings.IMAGE_MODEL_ID
            )
            
            if result.get('res'):
                # 解析响应
                parsed_result = self._parse_result(result['res'])
                parsed_result['model_used'] = settings.IMAGE_MODEL_ID
                parsed_result['analysis_type'] = 'image_text'
                return parsed_result
            else:
                return {
                    'status': 'error',
                    'message': '图文分析失败',
                    'similarity': 0.0
                }
                
        except Exception as e:
            logger.error(f"图文特征比对失败: {str(e)}")
            return {
                'status': 'error',
                'message': str(e),
                'similarity': 0.0
            }
    
    async def compare_streaming(self,
                               feature_text: str,
                               compare_content: str,
                               user_input: str = "") -> Dict:
        """
        流式执行特征比对分析
        
        Args:
            feature_text: 技术特征文本
            compare_content: 对比文件内容
            user_input: 用户额外需求
            
        Yields:
            分析结果片段
        """
        try:
            prompt = self._build_prompt(feature_text, compare_content, user_input)
            
            # 系统提示词
            system_prompt = """你是简爱数智开发的专利AI助理，专注于协助用户高效处理专利领域相关问题。
你的核心职责涵盖：
1. 专利技术解析：深入剖析专利文献中的技术方案、创新点及具体实施方式。
2. 专利比对分析：进行专利检索，并对比分析不同专利技术方案间的异同点、新颖性和创造性。
3. 审查意见答复：协助用户理解和应对专利审查意见，提供答复思路和陈述建议。"""
            
            # 流式调用LLM
            full_response = ""
            async for delta in self.llm_client.process_item_streaming(
                prompt, 
                model=self.model_id,
                system_prompt=system_prompt
            ):
                full_response += delta
                yield {
                    'type': 'delta',
                    'content': delta
                }
            
            # 最后返回完整的解析结果
            parsed_result = self._parse_result(full_response)
            parsed_result['type'] = 'final'
            yield parsed_result
            
        except Exception as e:
            logger.error(f"流式特征比对失败: {str(e)}")
            yield {
                'type': 'error',
                'status': 'error',
                'message': str(e)
            }
    
    def _build_prompt(self, feature_text: str, compare_content: str, user_input: str) -> str:
        """构建LLM提示词"""
        prompt = f"""
您是一位精于特征比对的专利分析专家，现在需要从输入的技术特征，对比文件内容中找到相关的片段，然后再找到核心相关片段，输出技术特征与核心相关片段的不同。

步骤：
1. 首先找到对比文件内容中与技术特征最相关的片段
2. 列出技术特征，以及核心相关片段里待比对的技术特征。
3. 从多个角度来分析，比如实现的目的、结构功能、效果等。并且如果用户有额外的需求，需要结合用户需求来进行分析。

具体比对的方法：
3.1 主要看对比文件片段的技术特征，是否属于权利要求的技术特征的子集。如果是子集，则权要的技术特征被公开。
3.2 如果权要的技术特征里的某些部分与对比文件不同，则没被公开
3.3 如果权要的技术特征有相同类型的部分，但其作用或者效果不一样，则没被公开
4. 给出相同或者不同的结论

<技术特征>
{feature_text}
</技术特征>

<对比文件>
{compare_content}
</对比文件>

{f'<用户需求>{user_input}</用户需求>' if user_input else ''}

请输出结构化的比对分析结果，包括：
1. 相关片段（找到的所有相关内容）
2. 核心相关片段（最相关的部分）
3. 特征对比分析（详细的对比分析过程）
4. 是否被公开（明确结论：是/否）
5. 相似度评分（0-100的数值）
6. 主要差异点（如果存在）

输出格式要求：
- 使用清晰的段落划分
- 重要结论要明确标注
- 相似度用具体数值表示
"""
        return prompt
    
    def _parse_result(self, llm_response: str) -> Dict:
        """解析LLM响应结果"""
        try:
            # 初始化结果字典
            result = {
                'status': 'success',
                'related_content': '',
                'core_content': '',
                'analysis_process': '',
                'is_disclosed': '待分析',
                'similarity': 0.0,
                'main_differences': ''
            }
            
            # 尝试提取各部分内容
            response_lower = llm_response.lower()
            
            # 提取相关片段
            if '相关片段' in llm_response:
                start = llm_response.find('相关片段')
                end = llm_response.find('核心相关片段', start)
                if start != -1:
                    content = llm_response[start:end if end != -1 else None]
                    result['related_content'] = content.replace('相关片段', '').strip()
            
            # 提取核心相关片段
            if '核心相关片段' in llm_response:
                start = llm_response.find('核心相关片段')
                end = llm_response.find('特征对比分析', start)
                if end == -1:
                    end = llm_response.find('分析', start + 20)
                if start != -1:
                    content = llm_response[start:end if end != -1 else None]
                    result['core_content'] = content.replace('核心相关片段', '').strip()
            
            # 提取分析过程
            if '分析' in llm_response:
                start = llm_response.find('特征对比分析')
                if start == -1:
                    start = llm_response.find('分析过程')
                if start == -1:
                    start = llm_response.find('分析')
                end = llm_response.find('是否被公开', start)
                if start != -1:
                    content = llm_response[start:end if end != -1 else None]
                    result['analysis_process'] = content.strip()
            
            # 提取是否被公开
            if '被公开' in llm_response or '公开' in llm_response:
                if '未被公开' in llm_response or '没被公开' in llm_response or '不被公开' in llm_response:
                    result['is_disclosed'] = '否'
                elif '被公开' in llm_response:
                    result['is_disclosed'] = '是'
            
            # 提取相似度
            import re
            similarity_pattern = r'相似度[：:]\s*(\d+)'
            match = re.search(similarity_pattern, llm_response)
            if match:
                result['similarity'] = float(match.group(1))
            else:
                # 尝试查找百分比
                percent_pattern = r'(\d+)%'
                match = re.search(percent_pattern, llm_response)
                if match:
                    result['similarity'] = float(match.group(1))
            
            # 提取主要差异
            if '差异' in llm_response:
                start = llm_response.find('主要差异')
                if start == -1:
                    start = llm_response.find('差异点')
                if start != -1:
                    content = llm_response[start:start+500]  # 取500字符
                    result['main_differences'] = content.strip()
            
            # 如果没有提取到任何内容，将整个响应作为分析过程
            if not result['analysis_process']:
                result['analysis_process'] = llm_response
            
            return result
            
        except Exception as e:
            logger.error(f"解析LLM响应失败: {str(e)}")
            return {
                'status': 'success',
                'related_content': llm_response[:500] if len(llm_response) > 500 else llm_response,
                'analysis_process': llm_response,
                'is_disclosed': '待分析',
                'similarity': 0.0
            }
    
    async def _retrieve_related_documents(self, query: str, dataset_ids: List[str]) -> List[Dict]:
        """
        从RAGFlow检索相关文档
        
        Args:
            query: 查询文本
            dataset_ids: 数据集ID列表
            
        Returns:
            检索结果列表
        """
        try:
            # 如果没有指定数据集，使用默认的中文数据集
            if not dataset_ids:
                dataset_ids = [settings.ZH_DATASET_ID]
            
            # 调用文档处理器检索
            docs = await self.doc_processor.retrieve_documents(
                query=query,
                dataset_ids=dataset_ids,
                top_k=5
            )
            
            return docs
            
        except Exception as e:
            logger.error(f"文档检索失败: {str(e)}")
            return []
    
    def _format_retrieved_docs(self, docs: List[Dict]) -> str:
        """
        格式化检索到的文档
        
        Args:
            docs: 文档列表
            
        Returns:
            格式化的文档内容
        """
        formatted = []
        for i, doc in enumerate(docs, 1):
            content = doc.get('content', '')
            score = doc.get('score', 0)
            source = doc.get('source', '未知来源')
            
            formatted.append(f"""
文档 {i}:
来源: {source}
相关度: {score:.2f}
内容:
{content}
""")
        
        return "\n---\n".join(formatted)


# 测试代码
async def test_feature_comparator():
    """测试特征比对器"""
    comparator = FeatureComparator()
    
    # 测试数据
    feature_text = "一种包括处理器和存储器的电子设备，所述处理器用于执行存储在存储器中的程序指令"
    compare_content = "本发明公开了一种计算装置，包含CPU和RAM存储单元，CPU可以运行存储在RAM中的软件代码"
    
    # 执行比对
    result = await comparator.compare(
        feature_text=feature_text,
        compare_content=compare_content,
        user_input="请重点分析硬件结构的差异"
    )
    
    print("比对结果:")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    
    # 测试流式比对
    print("\n流式比对结果:")
    async for chunk in comparator.compare_streaming(
        feature_text=feature_text,
        compare_content=compare_content
    ):
        if chunk.get('type') == 'delta':
            print(chunk['content'], end='', flush=True)
        elif chunk.get('type') == 'final':
            print("\n\n最终解析结果:")
            print(json.dumps(chunk, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    # 运行测试
    asyncio.run(test_feature_comparator())