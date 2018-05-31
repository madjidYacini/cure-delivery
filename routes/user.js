import { Router } from "express";
import UserControllers from "../controllers/user";
import User from "../models/user";
import passport from "passport";
import passportService from "../middleware/passport";
const passportAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

let api = Router();

api.get("/", UserControllers.get_user);

api.get("/protect", passportAuth, UserControllers.user_protected);

api.post("/signup", UserControllers.user_signup);
api.post("/login", [requireLogin, UserControllers.user_login]);
api.get("/:id",passportAuth, UserControllers.user_informations);
// api.patch("/:id", UserControllers.user_update_info);
api.patch("/password/:id", UserControllers.user_update_password);
export default api;
