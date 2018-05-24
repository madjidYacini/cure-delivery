import { Router } from "express";
import User from "../models/user";
import UserControllers from "../controllers/user";

let api = Router();

api.get("/", UserControllers.get_user);

// api.post('/', Controllers.set_user)
api.post('/signup',UserControllers.user_signup);
api.post('/login',UserControllers.user_login)
api.get("/:id", UserControllers.user_informations);
api.patch("/:id", UserControllers.user_update_info);
export default api
