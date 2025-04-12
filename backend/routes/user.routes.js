const express = require("express");
const {createUser,loginUser}=require("../controllers/user.controller");
const {authMiddleware}=require("../middlewares/auth.middleware");
const router=express.Router();
router.post("/register",createUser);
router.post("/login",loginUser);
module.exports=router;