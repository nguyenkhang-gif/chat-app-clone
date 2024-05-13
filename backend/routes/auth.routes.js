import express, { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

// router.get("/test",(req,res)=>{
//     console.log("sjjss");
//     res.json("work")
// })

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
