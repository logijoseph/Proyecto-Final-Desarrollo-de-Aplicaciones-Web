let mongoose = require("mongoose")
const Schema = mongoose.Schema

const TareaSchema = Schema({
    tarea:String,
    prioridad: String,
    status: {
        type: Boolean ,
        default: false
    },
    userId: String
})

module.exports = mongoose.model('tareasmensual',TareaSchema)