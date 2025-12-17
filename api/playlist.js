import fs from "fs"
import path from "path"

const FILE = path.join("/tmp", "playlist.json")

function readDB(){
  if(!fs.existsSync(FILE)) return {}
  return JSON.parse(fs.readFileSync(FILE,"utf8"))
}

function writeDB(db){
  fs.writeFileSync(FILE, JSON.stringify(db))
}

export default function handler(req,res){
  if(req.method === "GET"){
    const { uid } = req.query
    if(!uid) return res.json([])
    const db = readDB()
    return res.json(db[uid] || [])
  }

  if(req.method === "POST"){
    const { uid, data } = req.body
    if(!uid || !data) return res.status(400).end()
    const db = readDB()
    db[uid] = data
    writeDB(db)
    return res.json({ ok:true })
  }

  res.status(405).end()
}
