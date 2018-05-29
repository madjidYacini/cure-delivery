import { Router } from "express";
import OrdonanceControllers from "../controllers/ordonance";
// import ordonance  from "../models/ordonances";

let api = Router();

api.get("/", OrdonanceControllers.display);
api.post("/insert", OrdonanceControllers.insert_data);
export default api;
