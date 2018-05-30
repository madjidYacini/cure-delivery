const medicament = require("../config/medicaments.json");
import { Ordonances } from "../models";

// --------> display some drugs 

exports.display = (req, res) => {
  try {
   
    res.status(200).json({
      res: medicament
    });
  } catch (error) {
    console.log(error);
  }
};


// ----------> insert  data into database "ordonance"

exports.insert_data = async (req, res)=>{
    let {num_secu, image64}= req.body
   
    console.log(num_secu, image64);
        
           const ord = { image: image64, numsecu: num_secu };
       
        console.log(ord)
        Ordonances.create(ord)
          .then(result => {
            if (!result){
              res.status(400).json({
                message :"there was an error while executing the request"
              })
            }else{
            res.status(200).json({
                message: "product added",
                product: result
              });
            }
          })
        
          .catch(err => {
            res.status(500).json({ error: err.message });
         
          });
   
}



