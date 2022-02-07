let jwt = require("jsonwebtoken")

function verifyToken(req,res,next){
    let token = req.cookies.token || ''

    if(!token){
        return res.redirect('/login') //A la ruta de /login
    }
    else{
        //Si existe el token va a revisar si este tovadía no ha expirado, o si es válido
        jwt.verify(token, process.env.SECRET, function(err,datos){
            if(err){
                console.log(err)
                return res.redirect('/login')
            }
            else{
                //El user.id lo creamos aquí para mandarlo de req a la siguiente parte
                req.userId = datos.id
                next() //Para continuar con el proceso
            }
        })
    }
}

module.exports = verifyToken