let mongoose = require("mongoose")
const Schema = mongoose.Schema

const TareaSchema = Schema({
    tarea:String,
    prioridad: String,
    status: {
        type: Boolean ,
        default: false
    }
})

module.exports = mongoose.model('tareassemanal',TareaSchema)