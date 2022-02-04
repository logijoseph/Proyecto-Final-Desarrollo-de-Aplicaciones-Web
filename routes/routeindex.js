let express = require("express");
const router = express.Router();  //Método de redireccionamiento
//Aquí poner las bases de datos

router.use(express.static('public'))

router.get("/", async (req,res)=>{
    res.render("index")
})

router.get("/diario", async (req,res)=>{
    res.render("diario")
})

router.get("/semanal", async (req,res)=>{
    res.render("semanal")
})

router.get("/mensual", async (req,res)=>{
    res.render("mensual")
})

router.get("/anual", async (req,res)=>{
    res.render("anual")
})

router.get("/finanzas", async (req,res)=>{
    res.render("finanzas")
})

module.exports = router;