let mongoose = require("mongoose") //Para importar mongoose
const Schema = mongoose.Schema //Para importar el Schema de cada modelo

let IngresoEgreso = Schema ({
    cantidad: Number,
    tipoFlujo: String,
    descripcion: String,
    fecha:Date,
    userId: String
})

module.exports = mongoose.model("ingresoegreso", IngresoEgreso)