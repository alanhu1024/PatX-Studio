export interface FeatureResponse {
  feature_id: string
  claim: string
  feature_seq: string
  feature_content: string
  compare_file?: string | null
  relation_paragraph?: string | null
  relation_core_paragraph?: string | null
  analysis_process?: string | null
  analysis_result?: string | null
  status: string
  created_at?: string | null
  updated_at?: string | null
}

export interface FeatureBatchResponse {
  features: FeatureResponse[]
  total: number
  message: string
}

export interface AnalysisProgressResponse<T = any> {
  task_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  message?: string
  result?: T
}

export interface FeatureCompareResponse {
  status: string
  related_content?: string
  core_content?: string
  analysis_process?: string
  is_disclosed?: string
  similarity?: number
  main_differences?: string
  model_used?: string
  analysis_type?: string
  retrieved_docs?: number
  message?: string
}

// Call BFF route to avoid directly exposing backend address
export async function parseFeatures(params: { text: string; save_to_db?: boolean }) {
  const form = new FormData()
  form.set('text', params.text)
  if (params.save_to_db) form.set('save_to_db', 'true')

  const res = await fetch('/api/features/parse', { method: 'POST', body: form })
  if (!res.ok) throw new Error(`parseFeatures failed: ${res.status}`)
  return (await res.json()) as FeatureBatchResponse
}

export async function uploadFiles(files: File[]) {
  const form = new FormData()
  files.forEach((f) => form.append('files', f))
  const res = await fetch('/api/features/upload', { method: 'POST', body: form })
  if (!res.ok) throw new Error(`uploadFiles failed: ${res.status}`)
  return await res.json()
}

export async function startAnalyze(body: {
  features: Array<Record<string, any>>
  compare_files: Array<{ filename: string; content: string }>
  analysis_type?: 'all' | 'match_only' | 'llm_only'
}) {
  const res = await fetch('/api/features/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`startAnalyze failed: ${res.status}`)
  return (await res.json()) as AnalysisProgressResponse
}

export async function getAnalyzeProgress<T = any>(taskId: string) {
  const res = await fetch(`/api/features/analyze/${taskId}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`getAnalyzeProgress failed: ${res.status}`)
  return (await res.json()) as AnalysisProgressResponse<T>
}

export async function compareFeature(body: {
  feature_text: string
  compare_content: string
  user_input?: string
  model_id?: string
  use_rag?: boolean
  dataset_ids?: string[]
}) {
  const res = await fetch('/api/feature/compare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`compareFeature failed: ${res.status}`)
  return (await res.json()) as FeatureCompareResponse
}

export function compareFeatureStream(body: {
  feature_text: string
  compare_content: string
  user_input?: string
  model_id?: string
}) {
  // Using fetch + ReadableStream is also possible, here returns SSE endpoint for EventSource usage
  return '/api/feature/compare_stream'
}


