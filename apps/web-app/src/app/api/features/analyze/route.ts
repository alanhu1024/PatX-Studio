export async function POST(req: Request) {
  try {
    const body = await req.json()
    const res = await fetch(`${process.env.FASTAPI_BASE_URL}/api/v1/features/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return new Response(res.body, { status: res.status, headers: res.headers })
  } catch (err: any) {
    return Response.json({ ok: false, error: err?.message || 'Proxy error' }, { status: 500 })
  }
}


