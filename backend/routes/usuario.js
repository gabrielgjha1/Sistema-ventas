var express = require('express');
var usuarios = require('../models/usuarios');
var bcrypt = require('bcryptjs');
var app = express();
var midautentication = require('../middleware/autenticacion');




//traer usuarios
app.get('/',(req,res)=>{


    usuarios.find({},'nombre email rol direccion ')
        .exec((err,usuario)=>{

            if (err){


                return res.status(500).json({

                    status:false,
                    mensaje:err,
                    as:"sd"

                });

            }

            return res.status(200).json({

                status:true,
                mensaje:'Datos',
                usuario

            });


        })

    
});

//traer 1 usuario

app.get('/:id',(req,res)=>{

    var id = req.params.id;
    
    usuarios.findOne({_id:id},(err,usuario)=>{

        if (err){
            
            return res.status(500).json({

                status:false,
                mensaje:'no se encontro el usuario',
                err

            })
        
        }

        return res.status(200).json({

            status:true,
            mensaje:'usuario encontradp',
            usuario

        })



    });

});



// guardar usuarios
app.post('/',(req,res)=>{

    var body = req.body;
    var Usuario = new usuarios();

    Usuario.nombre=body.nombre;
    Usuario.direccion=body.direccion;
    Usuario.email=body.email;
    Usuario.password= bcrypt.hashSync(body.password, 10); 
    Usuario.rol=body.rol;
 
    Usuario.save((err,usuario)=>{

        if (err){

            return res.status(400).json({

                status:false,
                mensaje:'El correo ya esta registrado',
                usuario    

            });

        }

        return res.status(200).json({

            status:true,
            mensaje:'Datos guardados',
            usuario  

        });


    })

});


//Actualizar usuarios
app.put('/:id',(req,res)=>{
    console.log()
    var body = req.body;
    var id = req.params.id
    console.log(id)
        usuarios.findByIdAndUpdate(id,body,(err,usuario)=>{
        if (err) {

            return res.status(500).json({
                status:false,
                mensaje:'error al actualizar',
                err
            })

        }

        return res.status(200).json({

                status:true,
                mensaje:'Datos actualizados',
                usuario

        });


    });

});

app.delete('/:id',(req,res)=>{

    var id = req.params.id;
    
    console.log(id)
    usuarios.findByIdAndRemove(id,(err,usuario)=>{


        if (err){
            
            return res.status(400).json({
                status:false,
                mensaje:"no se encontro el usuario",
                usuario
            })

        }

         return res.status(200).json({
            status:true,
            mensaje:"Usuario eliminado",
            usuario
        })


    });



});



module.exports =  app;