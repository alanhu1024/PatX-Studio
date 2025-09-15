# PATX Claim Chart Services

专利技术特征比对分析微服务

## 功能特点

- 📄 **技术特征提取**：自动从专利权利要求中提取技术特征
- 🔍 **智能比对分析**：将技术特征与对比文件进行匹配分析
- 🤖 **AI增强**：支持使用LLM进行深度语义分析
- 📊 **结构化输出**：生成结构化的比对分析报告
- 🗄️ **数据持久化**：支持SQLite和MySQL数据库存储
- 📁 **多格式支持**：支持PDF、Word、TXT等文档格式

## 快速开始

### 环境要求

- Python 3.8+
- pip

### 安装步骤

1. 进入services目录
```bash
cd services
```

2. 创建虚拟环境（推荐）
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows
```

3. 安装依赖
```bash
pip install -r requirements.txt
```

4. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，配置必要的参数
```

5. 运行服务
```bash
python main.py
```

服务将在 http://localhost:8001 启动

## API文档

启动服务后，访问以下地址查看API文档：
- Swagger UI: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc

## 主要API端点

### 特征解析
- `POST /api/v1/features/parse` - 解析技术特征文本

### 特征比对
- `POST /api/v1/features/compare` - 比对单个技术特征
- `POST /api/v1/features/analyze` - 执行完整的特征分析

### 文档处理
- `POST /api/v1/features/upload` - 上传对比文档

### 数据管理
- `GET /api/v1/features` - 获取特征列表
- `GET /api/v1/features/{feature_id}` - 获取特征详情
- `PUT /api/v1/features/{feature_id}` - 更新特征
- `DELETE /api/v1/features/{feature_id}` - 删除特征

## 项目结构

```
services/
├── analyzers/          # 分析器模块
│   ├── tech_analyzer.py       # 技术特征分析器
│   └── feature_comparator.py  # 特征比对器
├── processors/         # 文档处理器
│   └── document_processor.py  # 多格式文档处理
├── models/            # 数据模型
│   └── feature.py     # 技术特征模型
├── schemas/           # API模式定义
│   └── feature_schema.py
├── database/          # 数据库相关
│   ├── session.py     # 数据库会话管理
│   └── crud.py        # CRUD操作
├── api/              # API接口
│   ├── feature_api.py # 特征API路由
│   └── feature_compare_api.py # 特征比对API路由
├── utils/            # 工具类
│   ├── llm_utils.py   # LLM集成工具
│   └── llm_clients.py # LLM客户端
├── config.py         # 配置文件
├── main.py          # 主程序入口
└── requirements.txt  # 依赖列表
```
