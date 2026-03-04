import express from 'express'
import cors from 'cors'



const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173", 
    credentials:true
}))

// required all the routers here
const authRouter = require("./routes/auth.routes")

/*using all the routes here */
app.use("/api/auth", authRouter)

export default app;