var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Zapatos = new Schema({

    nombre:{type:String,required:[true,'el nombre es necesario']},
    codigo:{type:String,required:[true,'El codigo es necesario']},
    precio:{type:Number,required:[true,'EL precio es necesario']},
    tallas:{type:String,required:[true,'La talla es necesaria']},
    genero:{type:String,required:false},
    stock:{type:Number,required:true},
    img:{type:String,required:false}

});

module.exports = mongoose.model('Zapato',Zapatos)