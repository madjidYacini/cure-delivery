import { Router } from "express";
import OrdonanceControllers from "../controllers/ordonance";
// import ordonance  from "../models/ordonances";
import passport from "passport";
import passportService from "../middleware/passport";
const passportAuth = passport.authenticate("jwt", { session: false });
let api = Router();

api.get("/", OrdonanceControllers.display);
api.post("/insert",  OrdonanceControllers.insert_data);
export default api;
