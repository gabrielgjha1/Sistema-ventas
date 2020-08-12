var express = require('express');
var Usuario = require('../models/usuarios');
var bcrypt = require('bcryptjs');
var semilla = require('../config/semilla').seed;
var jwt = require('jsonwebtoken');
var app = express();

app.post('/',(req,res)=>{
    var body = req.body;
    Usuario.findOne({email:body.email},(err,usuarios)=>{


        if (err){

            return res.status(500).json({
                status:false,
                mensaje:'Error al hacer el login',
                err

            });

        }

        if (!usuarios){

            return res.status(400).json({
                status:false,
                mensaje:'Datos incorrectos',
                usuarios

            });

        }

        if (!bcrypt.compareSync(body.password,usuarios.password)){

            return res.status(400).json({
                ok:false,
                message:'Datos incorrectos'
            });
        
        }

        var token = jwt.sign({usuario:usuarios},semilla,{ expiresIn: 14400})

        return res.status(200).json({
            status:true,
            mensaje:'ok',
            usuarios,
            token
            
        })

    })


});

module.exports = app;