
var mongoose = require('mongoose');

Schema = mongoose.Schema

var UsuarioSchema = new Schema({

    nombre:{type:String,required:true},
    direccion:{type:String,require:true},
    email: {type:String, unique:true, required:[true,'El correo es necesario']},
    password:{type:String,require:true},
    rol:{type:String,require:true,default:'USER_ROLE'}

});

module.exports = mongoose.model('Usuario',UsuarioSchema)