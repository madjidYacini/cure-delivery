import {Pharmacie }from "../models";


// --------> set pharmacy in database 

exports.set_pharmacy = (req,res)=>{

    let {nom , address } = req.body
   
    const pharmacy = {
        nom ,
        address
    }
    Pharmacie.create(pharmacy)
    .then((result) => {
       if (!result) {
           res.status(400).json({
               res :"enregistrement non fait"
           })
       }else{
           res.status(200).json({
               message : "pharmacie ajoutée",
               result :result
           })
       }
    }).catch((err) => {
        console.log(err.message)
    });
   
}