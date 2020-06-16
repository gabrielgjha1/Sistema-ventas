var express = require('express');
var zapato = require('../models/zapatos')
var app = express();

app.get('/',(req,res)=>{

    zapato.find({},'nombre codigo precio tallas stock img')
    
    .exec((err,zapatos)=>{


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
            zapatos           

        })

    })

});


//guardar los datos
app.post('/',(req,res)=>{

    var body = req.body;
    let Zapato = new zapato();

    Zapato.nombre=body.nombre;
    Zapato.codigo=body.codigo;
    Zapato.precio=body.precio;
    Zapato.tallas=body.tallas;
    Zapato.stock=body.stock;
    Zapato.img=body.img

    Zapato.save((err,zapatos)=>{

        if (err){
            
            return res.status(500).json({

                status:false,
                mensaje:"Error al guardar los datos",
                err

            });
        }

        if (!zapatos){
            return res.status(400).json({

                status:false,
                mensaje:"Error al guardar los datos",
                err

            });
        }

        return res.status(200).json({

            status:true,
            
            zapatos

        });

    });

});


app.put('/:id',(req,res)=>{
    var id = req.params.id;
    var body = req.body;

    zapato.findOneAndUpdate (id,body,(err,zapatos)=>{

        if (err){

            return res.status(500).json({

                status:false,
                mensaje:"Error al actualizar los datos",
                err

            });

        }
        if (!zapatos){

            return res.status(400).json({

                status:false,
                mensaje:"Error al actualizar los datos",
                err

            });  
        }  
        

        return res.status(200).json({

            status:true,
            
            zapatos

        });
        
        
    });


});

app.delete('/:id',(req,res)=>{

    var id = req.params.id;

    zapato.findOneAndDelete(id,(err,zapatos)=>{


        if (err){

            return res.status(500).json({

                status:false,
                mensaje:"Error al borrar los datos",
                err

            });

        }
        if (!zapatos){

            return res.status(400).json({

                status:false,
                mensaje:"Error no exite  en  los datos",
                err

            });  
        } 
        

        return res.status(200).json({

            status:true,
            
            zapatos

        });
        
        


    });
    


});


module.exports=app