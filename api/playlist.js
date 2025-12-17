import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const userId = req.query.userId
    if (!userId) {
      return res.status(400).json({ error: 'No userId' })
    }

    const data = await kv.get(`playlist:${userId}`)
    return res.json(data || { playlists: [] })
  }

  if (method === 'POST') {
    const { userId, playlists } = req.body
    if (!userId) {
      return res.status(400).json({ error: 'No userId' })
    }

    await kv.set(`playlist:${userId}`, { playlists })
    return res.json({ success: true })
  }

  res.status(405).end()
}
