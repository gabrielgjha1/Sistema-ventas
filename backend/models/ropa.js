var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RopaSchema = new Schema({

    nombre:{type:String,required:[true,'el nombre es necesario']},
    codigo:{type:String,required:[true,'El codigo es necesario']},
    precio:{type:Number,required:[true,'EL precio es necesario']},
    tallas:{type:Array,default:['S','M','L','XS']},
    stock:{type:Array,required:true},
    img:{type:String,required:false}

});

module.exports= mongoose.model('Ropa',RopaSchema);

