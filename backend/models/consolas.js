var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConsolasSchema = new Schema({

    nombre:{type:String,required:[true,'Nombre del producto requerido']},
    codigo:{type:String,required:[true,'codigo del producto requerido']},
    precio:{type:Number,required:true},
    img:{type:String,required:false},
    stock:{type:String,required:true}

});
module.exports = mongoose.model('Consola',ConsolasSchema);