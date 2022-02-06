let mongoose = require("mongoose") //Para importar mongoose
const Schema = mongoose.Schema //Para importar el Schema de cada modelo
let bcrypt = require("bcrypt")

let UserSchema = Schema ({
    email: String, 
    psw: String
})

module.exports = mongoose.model("users", UserSchema)