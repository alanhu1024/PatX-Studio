"""数据库CRUD操作"""
from typing import List, Optional, Dict, Any
import uuid
from sqlalchemy.orm import Session
from sqlalchemy import func

from models.feature import TechnicalFeature


class FeatureCRUD:
    """技术特征CRUD操作"""
    
    @staticmethod
    def create(db: Session, feature_data: Dict[str, Any]) -> TechnicalFeature:
        """
        创建技术特征
        
        Args:
            db: 数据库会话
            feature_data: 特征数据字典
            
        Returns:
            创建的技术特征对象
        """
        if "feature_id" not in feature_data:
            feature_data["feature_id"] = uuid.uuid4().hex
        
        db_obj = TechnicalFeature(**feature_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    @staticmethod
    def bulk_create(db: Session, feature_datas: List[Dict]) -> List[TechnicalFeature]:
        """
        批量创建技术特征
        
        Args:
            db: 数据库会话
            feature_datas: 特征数据列表
            
        Returns:
            创建的技术特征对象列表
        """
        insert_data = []
        for feature_data in feature_datas:
            if "feature_id" not in feature_data:
                feature_data["feature_id"] = uuid.uuid4().hex
            insert_data.append(TechnicalFeature(**feature_data))
        
        db.bulk_save_objects(insert_data)
        db.commit()
        return insert_data
    
    @staticmethod
    def get_by_id(db: Session, feature_id: str) -> Optional[TechnicalFeature]:
        """
        根据ID获取技术特征
        
        Args:
            db: 数据库会话
            feature_id: 特征ID
            
        Returns:
            技术特征对象或None
        """
        return db.query(TechnicalFeature).filter(
            TechnicalFeature.feature_id == feature_id
        ).first()
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[TechnicalFeature]:
        """
        获取所有技术特征
        
        Args:
            db: 数据库会话
            skip: 跳过数量
            limit: 限制数量
            
        Returns:
            技术特征列表
        """
        return db.query(TechnicalFeature).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_by_claim(db: Session, claim: str) -> List[TechnicalFeature]:
        """
        根据权利要求获取技术特征
        
        Args:
            db: 数据库会话
            claim: 权利要求
            
        Returns:
            技术特征列表
        """
        return db.query(TechnicalFeature).filter(
            TechnicalFeature.claim == claim
        ).all()
    
    @staticmethod
    def update(db: Session, feature_id: str, update_data: Dict[str, Any]) -> Optional[TechnicalFeature]:
        """
        更新技术特征
        
        Args:
            db: 数据库会话
            feature_id: 特征ID
            update_data: 更新数据字典
            
        Returns:
            更新后的技术特征对象或None
        """
        feature = FeatureCRUD.get_by_id(db, feature_id)
        if not feature:
            return None
        
        for field, value in update_data.items():
            if hasattr(feature, field):
                setattr(feature, field, value)
        
        db.add(feature)
        db.commit()
        db.refresh(feature)
        return feature
    
    @staticmethod
    def delete(db: Session, feature_id: str) -> bool:
        """
        删除技术特征
        
        Args:
            db: 数据库会话
            feature_id: 特征ID
            
        Returns:
            是否删除成功
        """
        feature = FeatureCRUD.get_by_id(db, feature_id)
        if not feature:
            return False
        
        db.delete(feature)
        db.commit()
        return True
    
    @staticmethod
    def search(db: Session, keyword: str, skip: int = 0, limit: int = 100) -> List[TechnicalFeature]:
        """
        搜索技术特征
        
        Args:
            db: 数据库会话
            keyword: 搜索关键词
            skip: 跳过数量
            limit: 限制数量
            
        Returns:
            符合条件的技术特征列表
        """
        return db.query(TechnicalFeature).filter(
            TechnicalFeature.feature_content.contains(keyword)
        ).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_statistics(db: Session) -> Dict[str, Any]:
        """
        获取统计信息
        
        Args:
            db: 数据库会话
            
        Returns:
            统计信息字典
        """
        total_count = db.query(func.count(TechnicalFeature.id)).scalar()
        
        status_counts = db.query(
            TechnicalFeature.status,
            func.count(TechnicalFeature.id)
        ).group_by(TechnicalFeature.status).all()
        
        claim_counts = db.query(
            TechnicalFeature.claim,
            func.count(TechnicalFeature.id)
        ).group_by(TechnicalFeature.claim).all()
        
        return {
            'total_features': total_count,
            'status_distribution': dict(status_counts),
            'claim_distribution': dict(claim_counts)
        }