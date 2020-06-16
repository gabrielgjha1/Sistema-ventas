var express = require('express');
var consola = require('../models/consolas')
var app = express();

//traer datos
app.get('/',(req,res)=>{

    consola.find({},'nombre codigo precio stock img')
    
    .exec((err,consolas)=>{


        if (err){
         return   res.status(500).json({
                status:false,
                mensaje:"Error al traer los datos",
                err
            })
        }

       return res.status(200).json({

            status:true,
            mensaje:"datos",
            consolas          

        })

    })

});

//guardar datos
app.post('/',(req,res)=>{

    var body = req.body;
    let Consola = new consola();

    Consola.nombre=body.nombre;
    Consola.codigo=body.codigo;
    Consola.precio=body.precio;
    Consola.stock=body.stock;
    Consola.img=body.img

    Consola.save((err,consolas)=>{

        if (err){
            
            return res.status(500).json({

                status:false,
                mensaje:"Error al guardar los datos",
                err

            });
        }

        if (!consolas){
            return res.status(400).json({

                status:false,
                mensaje:"Error al guardar los datos",
                err

            });
        }

        return res.status(200).json({

            status:true,
            
            consolas

        });

    });

});


app.put('/:id',(req,res)=>{
    var id = req.params.id;
    var body = req.body;

    consola.findOneAndUpdate (id,body,(err,consolas)=>{

        if (err){

            return res.status(500).json({

                status:false,
                mensaje:"Error al actualizar los datos",
                err

            });

        }
        if (!consolas){

            return res.status(400).json({

                status:false,
                mensaje:"Error al actualizar los datos",
                err

            });  
        }  
        

        return res.status(200).json({

            status:true,
            
            consolas

        });
        
        
    });


});


app.delete('/:id',(req,res)=>{

    var id = req.params.id;

    consola.findOneAndDelete(id,(err,consolas)=>{


        if (err){

            return res.status(500).json({

                status:false,
                mensaje:"Error al borrar los datos",
                err

            });

        }
        if (!consolas){

            return res.status(400).json({

                status:false,
                mensaje:"Error no exite  en  los datos",
                err

            });  
        } 
        

        return res.status(200).json({

            status:true,
            consolas

        });
        
        


    });
    


});



module.exports=app