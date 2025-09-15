"""技术特征数据模型"""
from typing import Optional, Dict, List
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class TechnicalFeature(Base):
    """技术特征模型"""
    __tablename__ = 'technical_features'

    id = Column(Integer, primary_key=True, index=True)
    feature_id = Column(String(50), index=True, unique=True)
    
    # 基础信息
    claim = Column(String(255))  # 权利要求
    feature_seq = Column(String(50))  # 技术特征序号
    feature_content = Column(Text)  # 技术特征详情
    
    # 对比分析
    compare_file = Column(String(255))  # 对比文件
    relation_paragraph = Column(Text)  # 相关片段
    relation_core_paragraph = Column(Text)  # 相关核心片段
    analysis_process = Column(Text)  # 分析过程
    analysis_result = Column(Text)  # 分析结果
    
    # 扩展信息
    extend = Column(JSON)  # 扩展字段
    status = Column(String(50), default="pending")  # 状态
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def to_dict(self) -> Dict:
        """转换为字典"""
        return {
            'id': self.id,
            'feature_id': self.feature_id,
            'claim': self.claim,
            'feature_seq': self.feature_seq,
            'feature_content': self.feature_content,
            'compare_file': self.compare_file,
            'relation_paragraph': self.relation_paragraph,
            'relation_core_paragraph': self.relation_core_paragraph,
            'analysis_process': self.analysis_process,
            'analysis_result': self.analysis_result,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }