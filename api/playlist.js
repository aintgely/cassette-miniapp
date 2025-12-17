import { kv } from "@vercel/kv"

export default async function handler(req,res){
  if(req.method==="GET"){
    const { userId } = req.query
    const data = await kv.get(`playlist:${userId}`) || []
    return res.status(200).json(data)
  }

  if(req.method==="POST"){
    const { userId, playlist } = req.body
    await kv.set(`playlist:${userId}`, playlist)
    return res.status(200).json({ ok:true })
  }

  res.status(405).end()
}
