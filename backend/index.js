import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productRoute from "./routes/productRoute.js"
import cors from "cors";
dotenv.config()
const app = express()


// middleware
app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://product-catalog-react-frontend.vercel.app"
  ]
}));

// routes
app.use("/api/products",productRoute)


app.listen(5000,()=>{
    console.log("Server runing on port 5000");
})

app.get("/",(req,res)=>{
    res.send("Hello from Node.js")
})





const database = process.env.MONGODB_URL
console.log(database);
const connection = mongoose.connect(database)
.then(()=>{
    console.log("Database connect successfully");
}).catch((error)=>{
    console.log("Error:",error);
    
})
