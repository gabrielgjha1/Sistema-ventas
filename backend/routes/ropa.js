var express = require('express');
var ropa = require('../models/ropa');
var app = express();

// traer ropas
app.get('/',(req,res)=>{

    ropa.find({},'nombre codigo precio tallas stock img')
    
    .exec((err,ropas)=>{


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
            ropas           

        })

    })

});


//guardar los datos
app.post('/',(req,res)=>{

    var body = req.body;
    let Ropa = new ropa();

    Ropa.nombre=body.nombre;
    Ropa.codigo=body.codigo;
    Ropa.precio=body.precio;
    Ropa.tallas=body.tallas;
    Ropa.stock=body.stock;
    Ropa.img=body.img

    Ropa.save((err,ropas)=>{

        if (err){
            
            return res.status(500).json({

                status:false,
                mensaje:"Error al guardar los datos",
                err

            });
        }

        if (!ropa){
            return res.status(400).json({

                status:false,
                mensaje:"Error al guardar los datos",
                err

            });
        }

        return res.status(200).json({

            status:true,
            
            ropas

        });

    });

});

//actualizar
app.put('/:id',(req,res)=>{
    var id = req.params.id;
    var body = req.body;

    ropa. findOneAndUpdate (id,body,(err,ropas)=>{

        if (err){

            return res.status(500).json({

                status:false,
                mensaje:"Error al actualizar los datos",
                err

            });

        }
        if (!ropa){

            return res.status(400).json({

                status:false,
                mensaje:"Error al actualizar los datos",
                err

            });  
        }  
        

        return res.status(200).json({

            status:true,
            
            ropas

        });
        
        
    });


});


app.delete('/:id',(req,res)=>{

    var id = req.params.id;

    ropa.findOneAndDelete(id,(err,ropas)=>{


        if (err){

            return res.status(500).json({

                status:false,
                mensaje:"Error al borrar los datos",
                err

            });

        }
        if (!ropa){

            return res.status(400).json({

                status:false,
                mensaje:"Error no exite  en  los datos",
                err

            });  
        } 
        

        return res.status(200).json({

            status:true,
            
            ropas

        });
        
        


    });
    


});


module.exports=app;