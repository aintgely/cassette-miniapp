import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const { method } = req;

  // GET playlist
  if (method === "GET") {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId required" });
    }

    const playlist = await kv.get(`playlist:${userId}`) || [];
    return res.status(200).json(playlist);
  }

  // SAVE playlist
  if (method === "POST") {
    const { userId, playlist } = req.body;

    if (!userId || !playlist) {
      return res.status(400).json({ error: "invalid body" });
    }

    await kv.set(`playlist:${userId}`, playlist);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
