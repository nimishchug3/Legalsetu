const  {Router}=require("express");
const userRoutes=require("./user.routes");
const summaryRoutes=require("./summary.routes");
const backendroutes=Router();
backendroutes.use("/user",userRoutes);
backendroutes.use("/summary",summaryRoutes);

module.exports=backendroutes;