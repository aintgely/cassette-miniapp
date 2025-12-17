export default async function handler(req, res) {
  const KV_REST_API_URL = process.env.KV_REST_API_URL
  const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN

  const headers = {
    Authorization: `Bearer ${KV_REST_API_TOKEN}`,
    'Content-Type': 'application/json',
  }

  if (req.method === 'GET') {
    const userId = req.query.userId
    if (!userId) {
      return res.status(400).json({ error: 'No userId' })
    }

    const r = await fetch(
      `${KV_REST_API_URL}/get/playlist:${userId}`,
      { headers }
    )
    const data = await r.json()

    return res.json(data?.result || { playlists: [] })
  }

  if (req.method === 'POST') {
    const { userId, playlists } = req.body
    if (!userId) {
      return res.status(400).json({ error: 'No userId' })
    }

    await fetch(
      `${KV_REST_API_URL}/set/playlist:${userId}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ value: { playlists } }),
      }
    )

    return res.json({ success: true })
  }

  res.status(405).end()
}
