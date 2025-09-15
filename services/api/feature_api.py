"""特征分析API接口"""
from typing import List, Optional, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import pandas as pd
import io
import json

from database.session import get_db
from database.crud import FeatureCRUD
from schemas.feature_schema import (
    FeatureCreate, FeatureUpdate, FeatureResponse,
    FeatureBatchResponse, FeatureCompareRequest,
    FeatureAnalysisRequest, AnalysisProgressResponse
)
from analyzers.tech_analyzer import TechFeatureAnalyzer
from analyzers.feature_comparator import FeatureComparator
from processors.document_processor import DocumentProcessor
from utils.llm_utils import LLMClient

router = APIRouter(prefix="/api/v1/features", tags=["features"])

# 全局实例
llm_client = None
analyzer = None
comparator = None
doc_processor = DocumentProcessor()

# 任务缓存
analysis_tasks = {}


def get_llm_client():
    """获取LLM客户端实例"""
    global llm_client
    if llm_client is None:
        llm_client = LLMClient()
    return llm_client


def get_analyzer():
    """获取分析器实例"""
    global analyzer
    if analyzer is None:
        analyzer = TechFeatureAnalyzer(llm_client=get_llm_client())
    return analyzer


def get_comparator():
    """获取比对器实例"""
    global comparator
    if comparator is None:
        comparator = FeatureComparator(llm_client=get_llm_client())
    return comparator


@router.post("/parse", response_model=FeatureBatchResponse)
async def parse_features(
    text: str = Form(...),
    save_to_db: bool = Form(False),
    db: Session = Depends(get_db)
):
    """
    解析技术特征文本
    
    Args:
        text: 包含技术特征的文本
        save_to_db: 是否保存到数据库
        
    Returns:
        解析后的特征列表
    """
    try:
        analyzer = get_analyzer()
        features_df, message = analyzer.parse_features(text)
        
        if features_df.empty:
            return FeatureBatchResponse(
                features=[],
                total=0,
                message=message
            )
        
        # 转换为响应格式
        features = []
        for _, row in features_df.iterrows():
            feature_data = {
                'claim': row.get('权利要求', ''),
                'feature_seq': row.get('技术特征序号', ''),
                'feature_content': row.get('技术特征详情', ''),
                'status': 'pending'
            }
            
            # 如果需要保存到数据库
            if save_to_db:
                db_feature = FeatureCRUD.create(db, feature_data)
                feature_data['feature_id'] = db_feature.feature_id
                feature_data['created_at'] = db_feature.created_at
            else:
                feature_data['feature_id'] = ''
            
            features.append(FeatureResponse(**feature_data))
        
        return FeatureBatchResponse(
            features=features,
            total=len(features),
            message=message
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare")
async def compare_features(request: FeatureCompareRequest):
    """
    比对单个技术特征
    
    Args:
        request: 比对请求
        
    Returns:
        比对结果
    """
    try:
        comparator = get_comparator()
        result = comparator.compare(
            feature_text=request.feature_text,
            compare_content=request.compare_content,
            user_input=request.user_input
        )
        
        return JSONResponse(content=result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze")
async def analyze_features(
    request: FeatureAnalysisRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    执行完整的特征分析
    
    Args:
        request: 分析请求
        background_tasks: 后台任务
        
    Returns:
        任务ID和初始状态
    """
    try:
        import uuid
        task_id = str(uuid.uuid4())
        
        # 初始化任务状态
        analysis_tasks[task_id] = {
            'status': 'pending',
            'progress': 0,
            'message': '任务已创建',
            'result': None
        }
        
        # 添加后台任务
        background_tasks.add_task(
            run_analysis_task,
            task_id,
            request,
            db
        )
        
        return AnalysisProgressResponse(
            task_id=task_id,
            status='pending',
            progress=0,
            message='分析任务已提交'
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/analyze/{task_id}", response_model=AnalysisProgressResponse)
async def get_analysis_progress(task_id: str):
    """
    获取分析任务进度
    
    Args:
        task_id: 任务ID
        
    Returns:
        任务进度信息
    """
    if task_id not in analysis_tasks:
        raise HTTPException(status_code=404, detail="任务不存在")
    
    task = analysis_tasks[task_id]
    
    return AnalysisProgressResponse(
        task_id=task_id,
        status=task['status'],
        progress=task['progress'],
        message=task.get('message'),
        result=task.get('result')
    )


@router.post("/upload")
async def upload_documents(
    files: List[UploadFile] = File(...)
):
    """
    上传对比文档
    
    Args:
        files: 上传的文件列表
        
    Returns:
        处理结果
    """
    try:
        processed_docs = []
        
        for file in files:
            # 保存文件到临时位置
            import tempfile
            import os
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename) as tmp_file:
                content = await file.read()
                tmp_file.write(content)
                tmp_path = tmp_file.name
            
            try:
                # 处理文档
                doc_data = doc_processor.process_file(tmp_path)
                processed_docs.append({
                    'filename': doc_data['filename'],
                    'content_length': doc_data['length'],
                    'language': doc_data['language']
                })
            finally:
                # 清理临时文件
                os.unlink(tmp_path)
        
        return JSONResponse(content={
            'status': 'success',
            'message': f'成功处理 {len(processed_docs)} 个文档',
            'documents': processed_docs
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{feature_id}", response_model=FeatureResponse)
async def get_feature(
    feature_id: str,
    db: Session = Depends(get_db)
):
    """
    获取单个特征详情
    
    Args:
        feature_id: 特征ID
        
    Returns:
        特征详情
    """
    feature = FeatureCRUD.get_by_id(db, feature_id)
    
    if not feature:
        raise HTTPException(status_code=404, detail="特征不存在")
    
    return FeatureResponse.from_orm(feature)


@router.put("/{feature_id}", response_model=FeatureResponse)
async def update_feature(
    feature_id: str,
    update_data: FeatureUpdate,
    db: Session = Depends(get_db)
):
    """
    更新特征信息
    
    Args:
        feature_id: 特征ID
        update_data: 更新数据
        
    Returns:
        更新后的特征
    """
    feature = FeatureCRUD.update(
        db, 
        feature_id, 
        update_data.dict(exclude_unset=True)
    )
    
    if not feature:
        raise HTTPException(status_code=404, detail="特征不存在")
    
    return FeatureResponse.from_orm(feature)


@router.delete("/{feature_id}")
async def delete_feature(
    feature_id: str,
    db: Session = Depends(get_db)
):
    """
    删除特征
    
    Args:
        feature_id: 特征ID
        
    Returns:
        删除结果
    """
    success = FeatureCRUD.delete(db, feature_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="特征不存在")
    
    return JSONResponse(content={'status': 'success', 'message': '特征已删除'})


@router.get("/", response_model=FeatureBatchResponse)
async def list_features(
    skip: int = 0,
    limit: int = 100,
    claim: Optional[str] = None,
    keyword: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    获取特征列表
    
    Args:
        skip: 跳过数量
        limit: 限制数量
        claim: 权利要求过滤
        keyword: 关键词搜索
        
    Returns:
        特征列表
    """
    if keyword:
        features = FeatureCRUD.search(db, keyword, skip, limit)
    elif claim:
        features = FeatureCRUD.get_by_claim(db, claim)
    else:
        features = FeatureCRUD.get_all(db, skip, limit)
    
    feature_responses = [
        FeatureResponse.from_orm(feature) for feature in features
    ]
    
    return FeatureBatchResponse(
        features=feature_responses,
        total=len(feature_responses),
        message='获取成功'
    )


def run_analysis_task(task_id: str, request: FeatureAnalysisRequest, db: Session):
    """
    后台运行分析任务
    
    Args:
        task_id: 任务ID
        request: 分析请求
        db: 数据库会话
    """
    try:
        analyzer = get_analyzer()
        
        # 更新状态
        analysis_tasks[task_id]['status'] = 'processing'
        analysis_tasks[task_id]['message'] = '正在解析特征...'
        
        # 解析特征
        features_df = pd.DataFrame(request.features)
        
        # 处理对比文件
        compare_docs = request.compare_files
        
        # 执行匹配
        def update_progress(progress, message):
            analysis_tasks[task_id]['progress'] = int(progress * 50)
            analysis_tasks[task_id]['message'] = message
        
        result_df, _ = analyzer.match_features(compare_docs, update_progress)
        
        # 如果需要LLM分析
        if request.analysis_type in ['all', 'llm_only']:
            def update_llm_progress(progress, message):
                analysis_tasks[task_id]['progress'] = 50 + int(progress * 50)
                analysis_tasks[task_id]['message'] = message
            
            result_df, _ = analyzer.analyze_with_llm(result_df, update_llm_progress)
        
        # 保存结果到数据库
        results = []
        for _, row in result_df.iterrows():
            feature_data = row.to_dict()
            # 转换列名
            feature_data = {
                'claim': feature_data.get('权利要求'),
                'feature_seq': feature_data.get('技术特征序号'),
                'feature_content': feature_data.get('技术特征详情'),
                'compare_file': feature_data.get('对比文件'),
                'relation_paragraph': feature_data.get('相关片段'),
                'relation_core_paragraph': feature_data.get('相关核心片段'),
                'analysis_process': feature_data.get('分析过程'),
                'analysis_result': feature_data.get('分析结果'),
                'status': 'completed'
            }
            
            db_feature = FeatureCRUD.create(db, feature_data)
            results.append(db_feature.to_dict())
        
        # 更新任务状态
        analysis_tasks[task_id]['status'] = 'completed'
        analysis_tasks[task_id]['progress'] = 100
        analysis_tasks[task_id]['message'] = '分析完成'
        analysis_tasks[task_id]['result'] = results
        
    except Exception as e:
        analysis_tasks[task_id]['status'] = 'failed'
        analysis_tasks[task_id]['message'] = str(e)
        analysis_tasks[task_id]['result'] = None