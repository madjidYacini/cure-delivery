// const medicament = require("../config/medicaments.json");
import { Commande } from "../models";



    // ==========>> insert the command

exports.store_commande = (req,res)=>{
    console.log(req.params)
    let {id,pid,ordid }= req.params;
    let commandeStatus = req.body.commandeStatus;
    let totalPrice = req.body.totalPrice;
    const commande = {
       UserId: id,
       PharmacieId: pid,
       OrdonanceId: ordid,
        statelivraison:commandeStatus,
        totalprice:totalPrice
    }


    Commande.create(commande)
    .then((commande) => {
       if (!commande) {
           res.status(400).json({
               message:"sorry the command was not registred"
           })
       }else{
           res.status(200).json({
               message:"command registered",
               command : commande
           })
       } 
    }).catch((err) => {
        console.log(err.message)
    });
     
    // console.log(commande);
}
