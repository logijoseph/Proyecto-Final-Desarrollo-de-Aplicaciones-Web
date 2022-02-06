let express = require("express");
const router = express.Router();  //Método de redireccionamiento
const TareasDiarias = require('../model/tareadiaria');
const TareasSemanales = require('../model/tareasemanal');
const TareasMensuales = require('../model/tareamensual');
const TareasAnuales = require('../model/tareaanual');
const User = require('../model/user')
let verify = require('../middleware/verifyAcces')
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
let flash = require("connect-flash")

router.get("/",async (req,res)=>{
    //console.log(req.userId)
    res.render("index")
})

router.get("/login", async(req,res)=>{
  res.render("login")
})

/*router.post("/login", async(req,res)=>{

})*/

router.post("/register", async(req,res)=>{
  let user = new User(req.body)

  let exists = await User.findOne({email: user.email})

  console.log(exists)
  if(exists){
    res.redirect("/register")
  }
  else{
    user.psw = bcrypt.hashSync(user.psw, 12) //Ahora cifraremos la contraseña
    await user.save()
    //console.log(user)
    res.redirect("/login")
  }
})

router.get("/register", async(req,res)=>{
  res.render("register")
})

router.get("/diario", async (req,res)=>{
  let tareas = await TareasDiarias.find()
    res.render("diario",{tareas})
})

router.get("/semanal", async (req,res)=>{
    let tareas = await TareasSemanales.find()
    res.render("semanal",{tareas})
})

router.get("/mensual", async (req,res)=>{
    let tareas = await TareasMensuales.find()
    res.render("mensual",{tareas})
})

router.get("/anual", async (req,res)=>{
    let tareas = await TareasAnuales.find()
    res.render("anual",{tareas})
})

router.get("/finanzas", async (req,res)=>{
    res.render("finanzas")
})
//Diario
router.get("/addDiario", async (req,res)=>{
    res.render("addDiario")
})
router.post('/addDiario', async (req,res) =>{
    console.log("Porqueeeeeeeeeeeee")
    let post = new TareasDiarias(req.body)
    await post.save()
    res.redirect("/diario");
  });
  router.get('/deletediario/:id',  async (req,res) =>{

    let id = req.params.id
    await TareasDiarias.remove({_id:id})
    res.redirect('/diario')
  })
  router.get('/editdiario/:id',   async(req,res) =>{

    let id = req.params.id
    let task  = await TareasDiarias.findById(id)
    res.render('editDiario',{task})
  
  })
  router.post('/editdiario/:id',   async(req,res) =>{
    await TareasDiarias.updateOne({_id:req.params.id},req.body)
    res.redirect('/diario')
      })
//Semanal
router.get("/addsemanal", async (req,res)=>{
    res.render("addsemanal")
})
router.post('/addsemanal', async (req,res) =>{

    let post = new TareasSemanales(req.body)
    await post.save()
    console.log("Funcionoooooooooooooooo")
    console.log(req.body)
    res.redirect("/semanal");
  });
  router.get('/deletesemanal/:id',  async (req,res) =>{

    let id = req.params.id
    await TareasSemanales.remove({_id:id})
    res.redirect('/semanal')
  })
  router.get('/editsemanal/:id',   async(req,res) =>{

    let id = req.params.id
    let task  = await TareasSemanales.findById(id)
    res.render('editsemanal',{task})
  
  })
  router.post('/editsemanal/:id',   async(req,res) =>{
    await TareasSemanales.updateOne({_id:req.params.id},req.body)
    res.redirect('/semanal')
      })
//Mensual
router.get("/addmensual", async (req,res)=>{
    res.render("addmensual")
})
router.post('/addmensual', async (req,res) =>{
    let post = new TareasMensuales(req.body)
    await post.save()
    res.redirect("/mensual");
  });
  router.get('/deletemensual/:id',  async (req,res) =>{

    let id = req.params.id
    await TareasMensuales.remove({_id:id})
    res.redirect('/mensual')
  })
  router.get('/editmensual/:id',   async(req,res) =>{

    let id = req.params.id
    let task  = await TareasMensuales.findById(id)
    res.render('editmensual',{task})
  
  })
  router.post('/editmensual/:id',   async(req,res) =>{
    await TareasMensuales.updateOne({_id:req.params.id},req.body)
    res.redirect('/mensual')
      })
//Anual
router.get("/addanual", async (req,res)=>{
    res.render("addanual")
})
router.post('/addanual', async (req,res) =>{
    let post = new TareasAnuales(req.body)
    await post.save()
    res.redirect("/anual");
  });
  router.get('/deleteanual/:id',  async (req,res) =>{

    let id = req.params.id
    await TareasAnuales.remove({_id:id})
    res.redirect('/anual')
  })
  router.get('/editanual/:id',   async(req,res) =>{

    let id = req.params.id
    let task  = await TareasAnuales.findById(id)
    res.render('editanual',{task})
  
  })
  router.post('/editanual/:id',   async(req,res) =>{
    await TareasAnuales.updateOne({_id:req.params.id},req.body)
    res.redirect('/anual')
      })
module.exports = router;