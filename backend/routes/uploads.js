var express = require('express');
// exportar modelos
var consola = require('../models/consolas');
var zapato = require('../models/zapatos');
var ropa = require('../models/ropa');

var fs = require('fs');

//libreria
const fileUpload = require('express-fileupload');
var app = express();
//necesario de la libreria
app.use(fileUpload());

app.put('/:tipo/:id',(req,res)=>{

    var id = req.params.id;
    var tipo = req.params.tipo;

    var TiposValidos = ['zapatos','consolas','ropas'];
    if (TiposValidos.indexOf (tipo)<0){

        if (!req.files){
            return res.status(400).json({
     
                 status:false,
                 mensaje:"Error, no es un tipo valido",
                
     
             });
         }
    }

    // validar si lo que envio el usuario es un archivo
    if (!req.files){
       return res.status(400).json({

            status:false,
            mensaje:"Error, no inserto un archivo",
           

        });
    }

    // se trae el archivo subido por el usuario
    var archivo = req.files.img;
    //se usa para guardar el nombre del archivo y la extencion
    var nombreCortado = archivo.name.split('.');
    //extencion del archivo
    var extensionArchivo=nombreCortado[nombreCortado.length-1];


    // se crea un archivo con las extenciones permitidas
    var extencionesValidas = ['png','jpg','gif','jpeg'];

    // verifica si la extencion del archivo existe en el arrego, si no existe el valor es -1
    if (extencionesValidas.indexOf( extensionArchivo )<0){
        
        return res.status(400).json({

            status:false,
            mensaje:"Error, EL formato del archivo no es valida",
        });

    }

    // se crea el nombre del archivo, lleva el id,3 numeors y la extension
    // 123123123-123.png
    var nombreArchivo =  `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;
    
    /// se  crea la ruta donde se enviara la imagen
    var path = `./uploads/${tipo}/${nombreArchivo}`
    console.log(path)
    archivo.mv(path,err=>{

        if (err){
            return res.status(500).json({

                status:false,
                mensaje:"Error al mover el archivo",
            });
        }
        // se le envia el tipo el id, el nombre del archivo y la respuesta
        subirPorTipo(tipo,id,nombreArchivo,res);
        
        /*Se comenta la respuesta
       

        */ 
    });



});

function subirPorTipo(tipo,id,nombreArchivo,res){



    if (tipo ==='zapatos'){

        // funcion de mongoose para asignar una imagen a un zapato
        zapato.findById(id,(err,zapatos)=>{

            //se crea la ruta con el nombre de la imagen
            // si la imagen existe se elimina despues par agregar otra
            var pathViejo='./uploads/zapatos/'+zapatos.img;
            console.log(pathViejo)
            //si la imagen existe se elimina paras despues actualizarla
            if (fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo)
            }

            //la imagen de nuestro zapaos que trajimos con el findbyid
            //le asignamos el nombre personalizado que creamos y que esta en uploads zapatos
            zapatos.img = nombreArchivo;
            // luego lo guardamos 
            zapatos.save((err,zapatos)=>{

               return res.status(200).json({
    
                    status:true,
                    mensaje:"funciona",
                    zapatos
                });

            });

        });

    }

    if (tipo==='ropas'){

        ropa.findById(id,(err,ropas)=>{

           var pathViejo = './uploads/ropas/'+ropas.img;

            if (fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo);
            }

            ropas.img = nombreArchivo;

            ropas.save((err,ropas)=>{
                
                return res.status(200).json({
    
                    status:true,
                    mensaje:"funciona",
                    ropas
                });

            });

        });


    }

    if (tipo==='consolas'){

        consola.findById(id,(err,consolas)=>{

      
            
            var   pathViejo = './uploads/consolas/'+consolas.img;
   
               if (fs.existsSync(pathViejo)){
   
                   fs.unlinkSync(pathViejo);
              
               }
        

            consolas.img = nombreArchivo;

            consolas.save((err,consolas)=>{

                return res.status(200).json({
    
                    status:true,
                    mensaje:"funciona",
                    consolas
                    
                });

            });

        });


        
    }

}



module.exports=app;