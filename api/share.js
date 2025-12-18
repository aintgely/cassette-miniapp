let DB = {} // memory db (AMAN buat test)

export default async function handler(req, res){
  if(req.method === "POST"){
    const id = "pl_" + Date.now()
    DB[id] = req.body
    return res.json({ id })
  }

  if(req.method === "GET"){
    const { id } = req.query
    return res.json(DB[id] || null)
  }
}
