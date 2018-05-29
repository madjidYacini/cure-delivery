import { Router } from "express";
import user from "./user";
import ordonance from "./ordonance";

let api = Router();

api.get("/", (req, res) => {
  res.json({ hi: "startupWeek API" });
});

api.use("/users", user);
api.use("/ordonances", ordonance);

export default api;
