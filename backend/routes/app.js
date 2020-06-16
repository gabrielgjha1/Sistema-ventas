var express = require('express');
var app = express();

app.get('/',(req,res)=>{

    res.status(200).json({
        status:true,
        mensaje:"hola"
    })

});

module.exports = app;