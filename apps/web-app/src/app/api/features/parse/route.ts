import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const res = await fetch(`${process.env.FASTAPI_BASE_URL}/api/v1/features/parse`, {
      method: 'POST',
      body: form,
    })
    return new Response(res.body, { status: res.status, headers: res.headers })
  } catch (err: any) {
    return Response.json({ ok: false, error: err?.message || 'Proxy error' }, { status: 500 })
  }
}


