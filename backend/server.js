const express=require("express");
const cors=require("cors");
const cookies=require("cookie-parser");
const bodyParser=require("body-parser");
const backendRoutes=require("./routes/backend.routes");
const db=require("./db");

const app=express();

app.use(cors({
    origin:"http://localhost:8080",
    credentials:true,
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookies());

// Routes
app.use("/api/v1", backendRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});