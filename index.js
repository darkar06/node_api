const express = require("express")
const app = express();
const logger = require("./logger")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
    {
        "id":    1,
        "title": "task 1",
        "content": "Limpiar la habitacion",
        "important": false
    },{
        "id": 2,
        "title": "task 2",
        "content": "hacer la tarea",
        "important": false
    },
    {
        "id": 3,
        "title": "task 3",
        "content": "Limpiar el escritorio",
        "important": false
    }
]

/*const app = http.createServer((req,res)=>{
    res.writeHead(200,{'content-Type': 'application/json'})
    res.end(JSON.stringify(notes))
})

*/

app.get('/', (req,res)=>{
    res.send('<h3>te veo wachin</h3>')
})

app.get('/app', (req,response)=>{
    response.json(notes)
})

app.get('/app/:id', (req,response)=>{
    const id = parseInt(req.params.id);
    const resp = notes.find( note => note.id === id);
    if (resp){
        
    response.json(resp)
    }else{
        response.status(404).end("no se encuentra ese id")
    }
})

app.delete('/app/delete/:id', (req,response)=>{
    const id = parseInt(req.params.id);
    notes = notes.filter( note => note.id !== id);
        
    response.status(204).end()
})

app.post('/app/post',(req,response)=>{
    const note = req.body;
    const ids = notes.map( not => not.id)
    const maxIds = Math.max(...ids)
    const newNote = {
        "id": maxIds + 1,
        "title":note.title,
        "content": note.content,
        "important": false 
    }

    notes = [...notes, newNote]

    response.json(newNote)
})

app.use((req,res)=>{
    res.status(404).json({"error": 404})
})

app.use(()=>{
    console.log("ha funionao")
})

const port = process.env.PORT || 3004;
app.listen(port,()=>{
    console.log("server on port " + port)
})
