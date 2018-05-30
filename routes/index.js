import { Router } from "express";
import user from "./user";
import ordonance from "./ordonance";
import commande from "./commande";
import pharmacie from "./pharmacie";

let api = Router();

api.get("/", (req, res) => {
  res.json({ hi: "startupWeek API" });
});

api.use("/users", user);
api.use("/ordonances", ordonance);
api.use ('/commande',commande);
api.use('/pharmacie',pharmacie);
export default api;
