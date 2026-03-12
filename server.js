const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const filePath = "./data/notes.json"


// GET NOTES
app.get("/api/notes",(req,res)=>{

const notes = JSON.parse(fs.readFileSync(filePath))

res.json(notes)

})


// ADD NOTE
app.post("/api/notes",(req,res)=>{

const notes = JSON.parse(fs.readFileSync(filePath))

const newNote = {
id: Date.now(),
text: req.body.text
}

notes.push(newNote)

fs.writeFileSync(filePath,JSON.stringify(notes,null,2))

res.json(newNote)

})


// DELETE NOTE
app.delete("/api/notes/:id",(req,res)=>{

let notes = JSON.parse(fs.readFileSync(filePath))

notes = notes.filter(note => note.id != req.params.id)

fs.writeFileSync(filePath,JSON.stringify(notes,null,2))

res.json({message:"deleted"})

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})