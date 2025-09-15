"""数据库会话管理"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import NullPool
from typing import Generator
import os

# 数据库URL，支持SQLite和MySQL
DATABASE_URL = os.getenv(
    'DATABASE_URL', 
    'sqlite:///./claim_chart.db'  # 默认使用SQLite
)

# 创建数据库引擎
if DATABASE_URL.startswith('sqlite'):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=NullPool
    )
else:
    # MySQL或其他数据库
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20
    )

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """
    获取数据库会话
    
    Yields:
        数据库会话对象
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """初始化数据库，创建所有表"""
    from models.feature import Base
    Base.metadata.create_all(bind=engine)


def drop_db():
    """删除所有表（谨慎使用）"""
    from models.feature import Base
    Base.metadata.drop_all(bind=engine)