var express = require('express');
var mongoose = require('mongoose');
const path = require('path');
var bodyParser = require('body-parser');


var port = process.env.PORT || 3000;
var app = express();
//inicializacion de variables
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// exportar rutas
var appRoute= require('./routes/app');
var ropaRoute= require('./routes/ropa');
var zapatosRoute= require('./routes/zapatos');
var consolasRoute= require('./routes/consola');
var uploadsRoute = require('./routes/uploads');
var imagenesRoute = require('./routes/imagenes');
var usuariosRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');


//permitir acceso a los datos
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE,OPTIONS")
    next();
  });


  //conexion a la base de datos
  mongoose.connection.openUri('mongodb://localhost:27017/ventas', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}, (err, res) => {
    if(err) throw err;
 
    console.log('Database conection: \x1b[32m%s\x1b[0m', 'ONLINE');
})


//rutas 
app.use('/',appRoute);
app.use('/ropa',ropaRoute);
app.use('/zapatos',zapatosRoute);
app.use('/upload',uploadsRoute);
app.use('/consolas',consolasRoute);
app.use('/usuarios',usuariosRoutes);
app.use('/login',loginRoutes);
app.use('/img',imagenesRoute);


//puerto del servidor
app.listen(port, function(){
    console.log("Express server listening on port %d in %s modess", this.address().port, app.settings.env);
  });
