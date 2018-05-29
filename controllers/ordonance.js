const medicament = require("../config/medicaments.json");
import { Ordonances } from "../models";
exports.display = (req, res) => {
  try {
    //   console.log(medicament)
    res.status(200).json({
      res: medicament
    });
  } catch (error) {
    console.log(error);
  }
};

exports.insert_data = async (req, res)=>{
    let {num_secu, image64}= req.body
    // let num_secu = req.body.num_secu;
    // let image64 = req.body.image64
    console.log(num_secu, image64);
        
           const ord = { image: image64, numsecu: num_secu };
       
        console.log(ord)
        Ordonances.create({ image: image64, numsecu: num_secu })
          .then(result => {
            res
              .status(200)
              .json({
                message: "product added",
                product: result
              });
          })
          .catch(err => {
            res.status(500).json({ error: err.message });
            console.log(err.message);
          });
   
}



