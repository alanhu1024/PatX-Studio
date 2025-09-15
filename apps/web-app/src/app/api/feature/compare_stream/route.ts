export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const res = await fetch(`${process.env.FASTAPI_BASE_URL}/api/v1/feature/compare_stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(body),
    })
    return new Response(res.body, { status: res.status, headers: { 'Content-Type': 'text/event-stream' } })
  } catch (err: any) {
    return Response.json({ ok: false, error: err?.message || 'Proxy error' }, { status: 500 })
  }
}


