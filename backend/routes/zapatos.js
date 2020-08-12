var express = require('express');
var zapato = require('../models/zapatos')
var app = express();

app.get('/',(req,res)=>{

    zapato.find({},'nombre codigo precio tallas stock img genero')
    
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



app.put('/:id/:stock',(req,res)=>{

    var id = req.params.id;
    var stock = req.params.stock;
    
    
    console.log(id)
    zapato.findOne({_id:id},(err,zapatos)=>{

        if (err){
            return   res.status(404).json({
                   status:false,
                   mensaje:"No se encontro el documento",
                   err
               })
           }

         let  total = zapatos.stock-stock;

           if (total<0){

            return   res.status(403).json({
                status:false,
                mensaje:"Ya se agotaron los articulos",
                err
            })

           }
           zapato.findOneAndUpdate({_id:id},{stock:total},(err,zapatos)=>{
               
            console.log(total);

                if (err){
                    return   res.status(404).json({
                        status:false,
                        mensaje:"No se encontro el documento",
                        err
                    })
                }

                
                
                return res.status(200).json({

                    status:true,
                    mensaje:"datos actualizados",
                    zapatos         
        
                })

           });

           
    });

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
    Zapato.genero=body.genero;
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