"""配置文件"""
import os
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """应用配置"""
    
    # 应用基础配置
    APP_NAME: str = "Claim Chart Tool"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # API配置
    API_PREFIX: str = "/api/v1"
    HOST: str = "0.0.0.0"
    PORT: int = 8001
    
    # 数据库配置
    DATABASE_URL: str = "sqlite:///./claim_chart.db"
    # MySQL示例: mysql+pymysql://user:password@localhost/claim_chart
    
    # LLM配置 - 主模型（火山引擎）
    API_KEY: str = os.getenv("API_KEY", "7a7d33b6-2f35-453c-a741-181e594d8245")
    MODEL_URL: str = os.getenv("MODEL_URL", "https://ark.cn-beijing.volces.com/api/v3")
    MODEL_ID: str = os.getenv("MODEL_ID", "deepseek-r1-250120")
    MODEL_ID_V3: str = os.getenv("MODEL_ID_V3", "deepseek-v3-250324")
    
    # LLM配置 - 阿里云通义千问
    QWEN_API_KEY: str = os.getenv("QWEN_API_KEY", "sk-48cac4f6e9ad4dabbcc0688654e70820")
    QWEN_MODEL_URL: str = os.getenv("QWEN_MODEL_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1")
    QWEN_MODEL_ID: str = os.getenv("QWEN_MODEL_ID", "qwen3-32b")
    
    # LLM配置 - 图文分析（Gemini）
    IMAGE_API_KEY: str = os.getenv("IMAGE_API_KEY", "sk-CXrBoRADCt81eeQECe211cF3E9Ed4e0d978a856647356bE5")
    IMAGE_MODEL_URL: str = os.getenv("IMAGE_MODEL_URL", "http://47.251.122.72/v1")
    IMAGE_MODEL_ID: str = os.getenv("IMAGE_MODEL_ID", "google/gemini-2.5-flash")
    
    # LLM配置 - DeepSeek官方
    DS_API_KEY: str = os.getenv("DS_API_KEY", "sk-51f3386b5d704133abfc7b8a414ffffe")
    DS_MODEL_URL: str = os.getenv("DS_MODEL_URL", "https://api.deepseek.com/v1")
    DS_MODEL_ID: str = os.getenv("DS_MODEL_ID", "deepseek-chat")
    
    # 文档处理API配置 (RAGFlow)
    DOCUMENT_API_URL: str = os.getenv("DOCUMENT_API_URL", "http://118.178.128.165:81")
    DOCUMENT_API_KEY: str = os.getenv("DOCUMENT_API_KEY", "ragflow-dhOTgwMDFjMGVmMzExZjA5M2NmMDI0Mj")
    ZH_DATASET_ID: str = os.getenv("ZH_DATASET_ID", "e8253b1e0ef211f0812602420a000090")
    EN_DATASET_ID: str = os.getenv("EN_DATASET_ID", "cb29fac8f38011efa00302420a0000ca")
    
    # OpenAI兼容配置（保留以兼容旧代码）
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", None)
    OPENAI_BASE_URL: str = "https://api.openai.com/v1"
    OPENAI_MODEL: str = "gpt-3.5-turbo"
    
    # 文件上传配置
    MAX_UPLOAD_SIZE: int = 50 * 1024 * 1024  # 50MB
    UPLOAD_DIR: str = "./uploads"
    ALLOWED_EXTENSIONS: set = {'.pdf', '.docx', '.doc', '.txt'}
    
    # 日志配置
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "claim_chart.log"
    
    # CORS配置
    CORS_ORIGINS: list = ["*"]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list = ["*"]
    CORS_ALLOW_HEADERS: list = ["*"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# 创建全局配置实例
settings = Settings()

# 确保上传目录存在
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)