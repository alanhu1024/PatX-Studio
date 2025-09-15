"""LLM工具类 - 处理与大语言模型的交互"""
import json
import logging
from typing import Dict, Any, Optional, AsyncGenerator
from openai import OpenAI, AsyncOpenAI
import os

logger = logging.getLogger(__name__)


class LLMClient:
    """LLM客户端封装"""
    
    def __init__(self, api_key: str = None, base_url: str = None, model_id: str = None):
        """
        初始化LLM客户端
        
        Args:
            api_key: API密钥
            base_url: API基础URL
            model_id: 默认模型ID
        """
        self.api_key = api_key or os.getenv('OPENAI_API_KEY')
        self.base_url = base_url or os.getenv('OPENAI_BASE_URL', 'https://api.openai.com/v1')
        self.model_id = model_id or os.getenv('OPENAI_MODEL', 'gpt-3.5-turbo')
        
        if not self.api_key:
            logger.warning("未配置API密钥，LLM功能将不可用")
            self.client = None
            self.async_client = None
        else:
            self.client = OpenAI(
                api_key=self.api_key,
                base_url=self.base_url
            )
            self.async_client = AsyncOpenAI(
                api_key=self.api_key,
                base_url=self.base_url
            )
    
    def generate(self, prompt: str, model: str = None, **kwargs) -> str:
        """
        同步生成响应
        
        Args:
            prompt: 提示词
            model: 模型ID（可选）
            **kwargs: 其他参数
            
        Returns:
            生成的文本
        """
        if not self.client:
            logger.error("LLM客户端未初始化")
            return ""
        
        try:
            completion = self.client.chat.completions.create(
                model=model or self.model_id,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=kwargs.get('max_tokens', 4000),
                temperature=kwargs.get('temperature', 0.7),
                **{k: v for k, v in kwargs.items() if k not in ['max_tokens', 'temperature']}
            )
            
            return completion.choices[0].message.content
            
        except Exception as e:
            logger.error(f"LLM生成失败: {str(e)}")
            return ""
    
    async def generate_async(self, prompt: str, model: str = None, **kwargs) -> str:
        """
        异步生成响应
        
        Args:
            prompt: 提示词
            model: 模型ID（可选）
            **kwargs: 其他参数
            
        Returns:
            生成的文本
        """
        if not self.async_client:
            logger.error("异步LLM客户端未初始化")
            return ""
        
        try:
            completion = await self.async_client.chat.completions.create(
                model=model or self.model_id,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=kwargs.get('max_tokens', 4000),
                temperature=kwargs.get('temperature', 0.7),
                **{k: v for k, v in kwargs.items() if k not in ['max_tokens', 'temperature']}
            )
            
            return completion.choices[0].message.content
            
        except Exception as e:
            logger.error(f"异步LLM生成失败: {str(e)}")
            return ""
    
    async def generate_stream(self, prompt: str, model: str = None, **kwargs) -> AsyncGenerator[str, None]:
        """
        流式生成响应
        
        Args:
            prompt: 提示词
            model: 模型ID（可选）
            **kwargs: 其他参数
            
        Yields:
            生成的文本片段
        """
        if not self.async_client:
            logger.error("异步LLM客户端未初始化")
            return
        
        try:
            stream = await self.async_client.chat.completions.create(
                model=model or self.model_id,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=kwargs.get('max_tokens', 4000),
                temperature=kwargs.get('temperature', 0.7),
                stream=True,
                **{k: v for k, v in kwargs.items() if k not in ['max_tokens', 'temperature', 'stream']}
            )
            
            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    
        except Exception as e:
            logger.error(f"流式LLM生成失败: {str(e)}")
            yield ""
    
    def generate_json(self, prompt: str, model: str = None, **kwargs) -> Dict[str, Any]:
        """
        生成JSON格式的响应
        
        Args:
            prompt: 提示词
            model: 模型ID（可选）
            **kwargs: 其他参数
            
        Returns:
            解析后的JSON对象
        """
        response = self.generate(prompt, model, **kwargs)
        
        if not response:
            return {}
        
        try:
            # 尝试提取JSON部分
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = response[json_start:json_end]
                return json.loads(json_str)
            else:
                logger.warning("响应中未找到JSON格式内容")
                return {}
                
        except json.JSONDecodeError as e:
            logger.error(f"JSON解析失败: {str(e)}")
            return {}
    
    async def generate_json_async(self, prompt: str, model: str = None, **kwargs) -> Dict[str, Any]:
        """
        异步生成JSON格式的响应
        
        Args:
            prompt: 提示词
            model: 模型ID（可选）
            **kwargs: 其他参数
            
        Returns:
            解析后的JSON对象
        """
        response = await self.generate_async(prompt, model, **kwargs)
        
        if not response:
            return {}
        
        try:
            # 尝试提取JSON部分
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = response[json_start:json_end]
                return json.loads(json_str)
            else:
                logger.warning("响应中未找到JSON格式内容")
                return {}
                
        except json.JSONDecodeError as e:
            logger.error(f"JSON解析失败: {str(e)}")
            return {}