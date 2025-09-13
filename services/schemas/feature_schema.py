"""特征相关的数据模式定义"""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from datetime import datetime


class FeatureBase(BaseModel):
    """特征基础模型"""
    claim: str
    feature_seq: str
    feature_content: str
    

class FeatureCreate(FeatureBase):
    """创建特征请求"""
    pass
    

class FeatureUpdate(BaseModel):
    """更新特征请求"""
    claim: Optional[str] = None
    feature_seq: Optional[str] = None
    feature_content: Optional[str] = None
    compare_file: Optional[str] = None
    relation_paragraph: Optional[str] = None
    relation_core_paragraph: Optional[str] = None
    analysis_process: Optional[str] = None
    analysis_result: Optional[str] = None
    status: Optional[str] = None


class FeatureCompareRequest(BaseModel):
    """特征比对请求"""
    feature_text: str
    compare_content: str
    user_input: Optional[str] = ""


class FeatureAnalysisRequest(BaseModel):
    """特征分析请求"""
    features: List[Dict[str, Any]]  # 特征列表
    compare_files: List[Dict[str, str]]  # 对比文件列表
    analysis_type: Optional[str] = "all"  # all, match_only, llm_only


class FeatureResponse(FeatureBase):
    """特征响应"""
    feature_id: str
    compare_file: Optional[str] = None
    relation_paragraph: Optional[str] = None
    relation_core_paragraph: Optional[str] = None
    analysis_process: Optional[str] = None
    analysis_result: Optional[str] = None
    status: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True


class FeatureBatchResponse(BaseModel):
    """批量特征响应"""
    features: List[FeatureResponse]
    total: int
    message: str


class AnalysisProgressResponse(BaseModel):
    """分析进度响应"""
    task_id: str
    status: str  # pending, processing, completed, failed
    progress: float  # 0-100
    message: Optional[str] = None
    result: Optional[Dict[str, Any]] = None