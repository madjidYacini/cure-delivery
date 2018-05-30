import { Router } from "express";
import PharmacyController from "../controllers/pharmacie";
// import ordonance  from "../models/ordonances";

let api = Router();
api.post("/set",PharmacyController.set_pharmacy)
export default api;