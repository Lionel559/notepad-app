const notesList = document.getElementById("notesList")

async function loadNotes(){

const res = await fetch("/api/notes")

const notes = await res.json()

notesList.innerHTML=""

notes.forEach(note=>{

const li = document.createElement("li")

li.className="list-group-item d-flex justify-content-between"

li.innerHTML=`

${note.text}

<button class="btn btn-sm btn-danger" onclick="deleteNote(${note.id})">
Delete
</button>

`

notesList.appendChild(li)

})

}

async function addNote(){

const input = document.getElementById("noteInput")

if(input.value.trim() === "") return

await fetch("/api/notes",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
text: input.value
})

})

input.value=""

loadNotes()

}

async function deleteNote(id){

await fetch(`/api/notes/${id}`,{
method:"DELETE"
})

loadNotes()

}

loadNotes()