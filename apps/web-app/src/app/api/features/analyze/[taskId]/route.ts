interface Params { params: { taskId: string } }

export async function GET(_: Request, { params }: Params) {
  try {
    const res = await fetch(`${process.env.FASTAPI_BASE_URL}/api/v1/features/analyze/${params.taskId}`, {
      cache: 'no-store',
    })
    return new Response(res.body, { status: res.status, headers: res.headers })
  } catch (err: any) {
    return Response.json({ ok: false, error: err?.message || 'Proxy error' }, { status: 500 })
  }
}


