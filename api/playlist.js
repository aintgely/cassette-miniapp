export default function handler(req, res) {
  if (req.method === "GET") {
    const { uid } = req.query
    if (!uid) return res.json([])

    return res.json([]) // sementara kosong, tapi STATUS 200
  }

  if (req.method === "POST") {
    const { uid, data } = req.body
    if (!uid || !data) return res.status(400).end()

    return res.json({ ok: true })
  }

  res.status(405).end()
}
