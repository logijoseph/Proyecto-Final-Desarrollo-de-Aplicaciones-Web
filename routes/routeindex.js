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
const IngresoEgreso = require('../model/ingresoegreso');


router.get("/",verify,async (req,res)=>{
    //console.log(req.userId)
    let tareas = await TareasDiarias.find({userId:req.userId})
    res.render("diario", {tareas})
})

router.get("/login", async(req,res)=>{
  res.render('index', {messages: req.flash('info')})
})


router.post("/login", async (req, res) => {
  let email = req.body.email
  let pswlogin = req.body.psw

  let user = await User.findOne({ email: email }) //Va a buscar si existe el usuario, si existe lo va a guardar, si no, guardará nulo
  //console.log(user)

  if(!user){
    req.flash('info', 'El usuario o la contraseña son incorrectos')
    res.redirect('/login')
  }
  else {
    //Aquí checaremos si la contraseña es correcta
    let valid = await bcrypt.compareSync(pswlogin, user.psw)

    if (valid) {
      //Le mandaremos como dato el correo del usuario
      let token = jwt.sign({ id: user.email }, process.env.SECRET, { expiresIn: "1h" })
      //console.log(token)
      res.cookie("token", token, { httpOnly: true })
      res.redirect('/')
    }

    else{
      req.flash('info', 'El usuario o la contraseña son incorrectos')
      res.redirect('/login')
    }
  }
})

router.post("/register", async (req, res) => {
  let user = new User(req.body)

  let exists = await User.findOne({ email: user.email })

  //console.log(exists)

  if(exists){
    req.flash('info', 'El usuario ya existe')

    res.redirect("/register")
  }
  else {
    user.psw = bcrypt.hashSync(user.psw, 12) //Ahora cifraremos la contraseña
    await user.save()
    //console.log(user)
    res.redirect("/login")
  }
})


router.get("/register", async(req,res)=>{
  res.render('register', {messages: req.flash('info')})

})

router.get("/diario", verify, async (req, res) => {
  let tareas = await TareasDiarias.find({ userId: req.userId })
  res.render("diario", { tareas })
})

router.get("/semanal", verify, async (req, res) => {
  let tareas = await TareasSemanales.find({ userId: req.userId })
  res.render("semanal", { tareas })
})

router.get("/mensual", verify, async (req, res) => {
  let tareas = await TareasMensuales.find({ userId: req.userId })
  res.render("mensual", { tareas })
})

router.get("/anual", verify, async (req, res) => {
  let tareas = await TareasAnuales.find({ userId: req.userId })
  res.render("anual", { tareas })
})

router.get("/finanzas", verify, async (req, res) => {
  
  let flujos = await IngresoEgreso.find({userId: req.userId});
  console.log(flujos);
  res.render("finanzas", {flujos});
})

router.post('/addFinanzas', verify, async (req, res) => {
  console.log("Add Finanzas");
  console.log(req.body)

  if(req.body.cantidad == '') return;

  let ingresoEgreso = new IngresoEgreso(req.body);

  ingresoEgreso.userId = req.userId;
  ingresoEgreso.fecha = Date.now();

  await ingresoEgreso.save();
  res.redirect("/finanzas");
});


//Diario

router.get("/addDiario", verify, async (req,res)=>{
    res.render("addDiario")
})
router.post('/addDiario', verify, async (req,res) =>{
    console.log("Porqueeeeeeeeeeeee")
    let post = new TareasDiarias(req.body)
    post.userId = req.userId //Le agrego el usuario que publicó el post
    await post.save()
    res.redirect("/diario");
  });
  router.get('/deletediario/:id',  verify, async (req,res) =>{
    let id = req.params.id
    await TareasDiarias.remove({_id:id})
    res.redirect('/diario')
  })
  router.get('/editdiario/:id',  verify, async(req,res) =>{
    let id = req.params.id
    let task  = await TareasDiarias.findById(id)
    res.render('editDiario',{task})
  
  })
  router.post('/editdiario/:id',  verify, async(req,res) =>{
    await TareasDiarias.updateOne({_id:req.params.id},req.body)
    res.redirect('/diario')
      })

//Semanal
router.get("/addsemanal", verify, async (req, res) => {
  res.render("addsemanal")
})
router.post('/addsemanal', verify, async (req, res) => {

  let post = new TareasSemanales(req.body)
  post.userId = req.userId //Le agrego el usuario que publicó el post
  await post.save()
  console.log("Funcionoooooooooooooooo")
  console.log(req.body)
  res.redirect("/semanal");
});
router.get('/deletesemanal/:id', verify, async (req, res) => {

  let id = req.params.id
  await TareasSemanales.remove({ _id: id })
  res.redirect('/semanal')
})
router.get('/editsemanal/:id', verify, async (req, res) => {

  let id = req.params.id
  let task = await TareasSemanales.findById(id)
  res.render('editsemanal', { task })

})
router.post('/editsemanal/:id', verify, async (req, res) => {
  await TareasSemanales.updateOne({ _id: req.params.id }, req.body)
  res.redirect('/semanal')
})
//Mensual
router.get("/addmensual", verify, async (req, res) => {
  res.render("addmensual")
})
router.post('/addmensual', verify, async (req, res) => {
  let post = new TareasMensuales(req.body)
  post.userId = req.userId //Le agrego el usuario que publicó el post
  await post.save()
  res.redirect("/mensual");
});
router.get('/deletemensual/:id', verify, async (req, res) => {

  let id = req.params.id
  await TareasMensuales.remove({ _id: id })
  res.redirect('/mensual')
})
router.get('/editmensual/:id', verify, async (req, res) => {

  let id = req.params.id
  let task = await TareasMensuales.findById(id)
  res.render('editmensual', { task })

})
router.post('/editmensual/:id', verify, async (req, res) => {
  await TareasMensuales.updateOne({ _id: req.params.id }, req.body)
  res.redirect('/mensual')
})
//Anual

router.get("/addanual", verify, async (req,res)=>{
    res.render("addanual")
})
router.post('/addanual', verify, async (req,res) =>{
    let post = new TareasAnuales(req.body)
    post.userId = req.userId //Le agrego el usuario que publicó el post
    await post.save()
    res.redirect("/anual");
});
router.get('/deleteanual/:id', verify, async (req,res) =>{

    let id = req.params.id
    await TareasAnuales.remove({_id:id})
    res.redirect('/anual')
})
router.get('/editanual/:id', verify,   async(req,res) =>{

    let id = req.params.id
    let task  = await TareasAnuales.findById(id)
    res.render('editanual',{task})
  
})
router.post('/editanual/:id', verify,  async(req,res) =>{
    await TareasAnuales.updateOne({_id:req.params.id},req.body)
    res.redirect('/anual')
})
 
router.get("/logoff", verify, async(req,res)=>{
    res.clearCookie("token") //Para eliminar el token
    res.redirect("/")
})

module.exports = router
