const  {Router}=require("express");
const userRoutes=require("./user.routes");
const backendroutes=Router();
backendroutes.use("/user",userRoutes);
module.exports=backendroutes;