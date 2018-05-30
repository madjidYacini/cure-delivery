
import { Router } from "express";
import CommandeController from "../controllers/commande";
// import ordonance  from "../models/ordonances";

let api = Router();

api.post("/:id/:pid/:ordid", CommandeController.store_commande);

export default api;
