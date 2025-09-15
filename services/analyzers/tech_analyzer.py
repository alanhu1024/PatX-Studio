"""技术特征分析器"""
import re
import pandas as pd
from typing import Dict, Tuple, List, Optional, Callable, Union
import logging

logger = logging.getLogger(__name__)


class TechFeatureAnalyzer:
    """技术特征分析器 - 负责特征解析、匹配和分析"""
    
    def __init__(self, llm_client=None):
        """
        初始化分析器
        
        Args:
            llm_client: LLM客户端（可选）
        """
        self.features_df = None
        self.comparison_texts = []
        self.processed_docs = []
        self.llm_client = llm_client
        
    def parse_features(self, text: str) -> Tuple[pd.DataFrame, str]:
        """
        解析技术特征文本
        
        Args:
            text: 包含技术特征的文本
            
        Returns:
            (DataFrame, 消息) 特征数据框和处理消息
        """
        try:
            features = self._split_claims(text)
            
            if not features:
                return pd.DataFrame(), "未能解析出技术特征"
            
            self.features_df = pd.DataFrame(features)
            return self.features_df, f"成功解析 {len(features)} 个技术特征"
            
        except Exception as e:
            logger.error(f"解析特征失败: {str(e)}")
            return pd.DataFrame(), f"解析失败: {str(e)}"
    
    def _split_claims(self, text: str) -> List[Dict]:
        """
        拆分权利要求和技术特征
        
        Args:
            text: 权利要求文本
            
        Returns:
            特征列表
        """
        features = []
        
        # 按权利要求分割
        claim_pattern = r'权利要求(\d+)[：:。.\s]*(.*?)(?=权利要求\d+|$)'
        claims = re.findall(claim_pattern, text, re.DOTALL)
        
        for claim_num, claim_text in claims:
            # 提取特征
            feature_list = self._extract_features(claim_text)
            
            for seq, feature_content in enumerate(feature_list, 1):
                features.append({
                    '权利要求': f"权利要求{claim_num}",
                    '技术特征序号': str(seq),
                    '技术特征详情': feature_content.strip()
                })
        
        # 如果没有找到标准格式，尝试其他分割方式
        if not features:
            # 按序号分割
            lines = text.strip().split('\n')
            for i, line in enumerate(lines, 1):
                if line.strip():
                    features.append({
                        '权利要求': '权利要求1',
                        '技术特征序号': str(i),
                        '技术特征详情': line.strip()
                    })
        
        return features
    
    def _extract_features(self, claim_text: str) -> List[str]:
        """
        从权利要求文本中提取技术特征
        
        Args:
            claim_text: 单个权利要求的文本
            
        Returns:
            技术特征列表
        """
        features = []
        
        # 方法1：按分号分割
        if '；' in claim_text or ';' in claim_text:
            parts = re.split('[；;]', claim_text)
            features = [part.strip() for part in parts if part.strip()]
        
        # 方法2：按特征序号分割 (如 "特征A", "特征B" 或 "(1)", "(2)")
        elif re.search(r'特征[A-Z\d]|（\d+）|\(\d+\)', claim_text):
            pattern = r'(?:特征[A-Z\d]|（\d+）|\(\d+\))[：:.\s]*(.*?)(?=特征[A-Z\d]|（\d+）|\(\d+\)|$)'
            matches = re.findall(pattern, claim_text, re.DOTALL)
            features = [match.strip() for match in matches if match.strip()]
        
        # 方法3：按逗号分割（谨慎使用）
        elif '，' in claim_text:
            parts = claim_text.split('，')
            # 只有当片段看起来像独立特征时才分割
            for part in parts:
                if len(part.strip()) > 10:  # 避免过短的片段
                    features.append(part.strip())
        
        # 如果没有分割，将整个文本作为一个特征
        if not features and claim_text.strip():
            features = [claim_text.strip()]
        
        return features
    
    def match_features(self, 
                      compare_docs: List[Dict[str, str]], 
                      progress: Optional[Callable] = None) -> Tuple[pd.DataFrame, str]:
        """
        将特征与对比文档进行匹配
        
        Args:
            compare_docs: 对比文档列表，每个文档包含 'filename' 和 'content'
            progress: 进度回调函数
            
        Returns:
            (DataFrame, 消息) 匹配结果数据框和处理消息
        """
        if self.features_df is None or self.features_df.empty:
            return pd.DataFrame(), "请先解析技术特征"
        
        if not compare_docs:
            return pd.DataFrame(), "没有提供对比文档"
        
        results = []
        total_features = len(self.features_df)
        total_docs = len(compare_docs)
        total_steps = total_features * total_docs
        current_step = 0
        
        for doc_index, doc in enumerate(compare_docs, 1):
            for feature_index, (_, row) in enumerate(self.features_df.iterrows(), 1):
                feature = row['技术特征详情']
                
                # 更新进度
                if progress:
                    progress_msg = f"匹配特征 {feature_index}/{total_features}, 文档 {doc_index}/{total_docs}"
                    current_step += 1
                    progress(current_step/total_steps, progress_msg)
                
                # 执行匹配
                matches = self._find_relevant_content(feature, doc['content'])
                
                results.append({
                    '权利要求': row['权利要求'],
                    '技术特征序号': row['技术特征序号'],
                    '技术特征详情': feature,
                    '对比文件': doc['filename'],
                    '相关片段': matches,
                    '相关核心片段': '',
                    '分析过程': '',
                    '分析结果': ''
                })
        
        result_df = pd.DataFrame(results)
        msg = f"匹配完成！共处理 {total_features} 个特征，{total_docs} 个文档"
        return result_df, msg
    
    def _find_relevant_content(self, feature: str, content: str, max_length: int = 500) -> str:
        """
        查找与特征相关的内容片段
        
        Args:
            feature: 技术特征
            content: 文档内容
            max_length: 返回片段的最大长度
            
        Returns:
            相关内容片段
        """
        # 提取特征关键词
        keywords = self._extract_keywords(feature)
        
        if not keywords:
            return content[:max_length] if len(content) > max_length else content
        
        # 查找包含关键词的句子
        sentences = re.split('[。！？]', content)
        relevant_sentences = []
        
        for sentence in sentences:
            if any(keyword in sentence for keyword in keywords):
                relevant_sentences.append(sentence)
                if len('。'.join(relevant_sentences)) > max_length:
                    break
        
        if relevant_sentences:
            return '。'.join(relevant_sentences)[:max_length]
        
        # 如果没有找到相关句子，返回前N个字符
        return content[:max_length] if len(content) > max_length else content
    
    def _extract_keywords(self, text: str) -> List[str]:
        """
        提取文本中的关键词
        
        Args:
            text: 输入文本
            
        Returns:
            关键词列表
        """
        # 简单的关键词提取逻辑
        # 可以根据需要增强（如使用jieba分词）
        
        # 移除标点符号
        text = re.sub(r'[^\w\s]', ' ', text)
        
        # 提取较长的词（可能是技术术语）
        words = text.split()
        keywords = [w for w in words if len(w) > 2]
        
        return keywords
    
    def analyze_with_llm(self, 
                        features_df: pd.DataFrame,
                        progress: Optional[Callable] = None) -> Tuple[pd.DataFrame, str]:
        """
        使用LLM进行深度分析
        
        Args:
            features_df: 包含特征和匹配结果的DataFrame
            progress: 进度回调函数
            
        Returns:
            (DataFrame, 消息) 分析结果数据框和处理消息
        """
        if self.llm_client is None:
            return features_df, "未配置LLM客户端"
        
        total = len(features_df)
        
        for index, row in features_df.iterrows():
            if progress:
                progress((index + 1) / total, f"分析特征 {index + 1}/{total}")
            
            # 构建分析请求
            analysis = self._analyze_single_feature(row)
            
            # 更新结果
            features_df.at[index, '相关核心片段'] = analysis.get('core_content', '')
            features_df.at[index, '分析过程'] = analysis.get('process', '')
            features_df.at[index, '分析结果'] = analysis.get('result', '')
        
        return features_df, f"LLM分析完成，共处理 {total} 个特征"
    
    def _analyze_single_feature(self, feature_row: pd.Series) -> Dict:
        """
        分析单个特征
        
        Args:
            feature_row: 特征行数据
            
        Returns:
            分析结果字典
        """
        # TODO: 实现具体的LLM分析逻辑
        return {
            'core_content': '核心内容待分析',
            'process': '分析过程待完善',
            'result': '未公开'
        }