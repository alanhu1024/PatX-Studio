"""特征比对API接口"""
from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import logging
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from analyzers.feature_comparator import FeatureComparator
from config import settings

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/feature", tags=["feature_compare"])


class FeatureCompareRequest(BaseModel):
    """特征比对请求模型"""
    feature_text: str
    compare_content: str
    user_input: Optional[str] = ""
    model_id: Optional[str] = None
    use_rag: Optional[bool] = False
    dataset_ids: Optional[List[str]] = None


class FeatureCompareImageRequest(BaseModel):
    """图文特征比对请求模型"""
    feature_text: str
    compare_content: str
    image_paths: List[str]
    user_input: Optional[str] = ""


class FeatureCompareResponse(BaseModel):
    """特征比对响应模型"""
    status: str
    related_content: Optional[str] = None
    core_content: Optional[str] = None
    analysis_process: Optional[str] = None
    is_disclosed: Optional[str] = None
    similarity: Optional[float] = None
    main_differences: Optional[str] = None
    model_used: Optional[str] = None
    analysis_type: Optional[str] = None
    retrieved_docs: Optional[int] = None
    message: Optional[str] = None


@router.post("/compare", response_model=FeatureCompareResponse)
async def compare_features(request: FeatureCompareRequest):
    """
    执行特征比对分析
    
    Args:
        request: 特征比对请求
        
    Returns:
        特征比对结果
    """
    try:
        # 创建比对器实例
        comparator = FeatureComparator(model_id=request.model_id)
        
        # 执行比对
        result = await comparator.compare(
            feature_text=request.feature_text,
            compare_content=request.compare_content,
            user_input=request.user_input,
            use_rag=request.use_rag,
            dataset_ids=request.dataset_ids
        )
        
        return FeatureCompareResponse(**result)
        
    except Exception as e:
        logger.error(f"特征比对API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare_with_image", response_model=FeatureCompareResponse)
async def compare_features_with_image(request: FeatureCompareImageRequest):
    """
    执行图文特征比对分析
    
    Args:
        request: 图文特征比对请求
        
    Returns:
        特征比对结果
    """
    try:
        # 创建比对器实例
        comparator = FeatureComparator()
        
        # 执行图文比对
        result = await comparator.compare_with_image(
            feature_text=request.feature_text,
            compare_content=request.compare_content,
            image_paths=request.image_paths,
            user_input=request.user_input
        )
        
        return FeatureCompareResponse(**result)
        
    except Exception as e:
        logger.error(f"图文特征比对API错误: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare_stream")
async def compare_features_streaming(
    feature_text: str = Body(...),
    compare_content: str = Body(...),
    user_input: str = Body(default=""),
    model_id: Optional[str] = Body(default=None)
):
    """
    流式执行特征比对分析
    
    Args:
        feature_text: 技术特征文本
        compare_content: 对比文件内容
        user_input: 用户额外需求
        model_id: 模型ID
        
    Returns:
        Server-Sent Events流
    """
    from fastapi.responses import StreamingResponse
    import json
    
    async def generate():
        try:
            # 创建比对器实例
            comparator = FeatureComparator(model_id=model_id)
            
            # 流式比对
            async for chunk in comparator.compare_streaming(
                feature_text=feature_text,
                compare_content=compare_content,
                user_input=user_input
            ):
                # 转换为SSE格式
                data = json.dumps(chunk, ensure_ascii=False)
                yield f"data: {data}\n\n"
            
            # 发送结束信号
            yield "data: [DONE]\n\n"
            
        except Exception as e:
            error_data = json.dumps({
                'type': 'error',
                'message': str(e)
            }, ensure_ascii=False)
            yield f"data: {error_data}\n\n"
    
    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )


@router.get("/models")
async def get_available_models():
    """
    获取可用的模型列表
    
    Returns:
        可用模型信息
    """
    return {
        "models": [
            {
                "id": settings.MODEL_ID,
                "name": "DeepSeek R1",
                "provider": "火山引擎",
                "type": "general"
            },
            {
                "id": settings.MODEL_ID_V3,
                "name": "DeepSeek V3",
                "provider": "火山引擎",
                "type": "general"
            },
            {
                "id": settings.QWEN_MODEL_ID,
                "name": "通义千问 3",
                "provider": "阿里云",
                "type": "general"
            },
            {
                "id": settings.DS_MODEL_ID,
                "name": "DeepSeek Chat",
                "provider": "DeepSeek",
                "type": "general"
            },
            {
                "id": settings.IMAGE_MODEL_ID,
                "name": "Gemini 2.5 Flash",
                "provider": "Google",
                "type": "image_text"
            }
        ],
        "default_model": settings.MODEL_ID_V3
    }


@router.get("/datasets")
async def get_available_datasets():
    """
    获取可用的RAG数据集
    
    Returns:
        数据集信息
    """
    return {
        "datasets": [
            {
                "id": settings.ZH_DATASET_ID,
                "name": "中文专利数据集",
                "language": "zh"
            },
            {
                "id": settings.EN_DATASET_ID,
                "name": "英文专利数据集",
                "language": "en"
            }
        ],
        "default_dataset": settings.ZH_DATASET_ID
    }