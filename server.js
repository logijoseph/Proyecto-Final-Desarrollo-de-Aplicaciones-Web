let express = require("express")
let path = require("path")

let app = express()

//Donde cargar los archivos estáticos
app.use(express.static('public'))

//Para codificar Json así puede escribir y recibir Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 3000; 

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/header", (req,res)=>{
    res.sendFile(path.join(__dirname, "header.html"))
})

app.get("/finanzas", (req,res)=>{
    res.sendFile(path.join(__dirname, "finanzas.html"))
})

app.get("/diario", (req,res)=>{
    res.sendFile(path.join(__dirname, "diario.html"))
})

app.get("/semanal", (req,res)=>{
    res.sendFile(path.join(__dirname, "semanal.html"))
})

app.get("/mensual", (req,res)=>{
    res.sendFile(path.join(__dirname, "mensual.html"))
})

app.get("/anual", (req,res)=>{
    res.sendFile(path.join(__dirname, "anual.html"))
})

app.listen(PORT, ()=>{
    console.log("Listening on PORT: ", PORT)
})