import express from 'express'


const app = express()
app.use(express.json())

// required all the routers here
const authRouter = require("./routes/auth.routes")

/*using all the routes here */
app.use("/api/auth", authRouter)

export default app;