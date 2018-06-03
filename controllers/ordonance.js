const medicament = require("../config/medicaments.json");
import { Ordonances } from "../models";
import crypto from"crypto";
import dotenv from "dotenv";
dotenv.config();

  let algorithm =  process.env.ALGORITHM,
  password = process.env.PASSWORD;

// --------> encrypt data  
function encrypt(text) {
  console.log(password);
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}
// ---------> decrypt data 
function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

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
   
    let num_secu_crypt = encrypt(num_secu);    
    let image_crypt = encrypt(image64)
        
           const ord = { image: image_crypt, numsecu: num_secu_crypt };
       
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



