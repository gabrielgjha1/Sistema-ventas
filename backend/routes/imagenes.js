var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.get('/:tipo/:img',(req,res)=>{

    var tipo = req.params.tipo;
    var img = req.params.img;

    var pathImagen = path.resolve(__dirname,`../uploads/${tipo}/${img}`)

    if (fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }
    else {
        var pathNoImagen = path.resolve(__dirname,'../assets/descarga.png');
        res.sendFile(pathImagen);
    }

  

});


module.exports = app;