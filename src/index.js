//1. import 
require('dotenv').config();
const express = require("express");
const cors = require("cors");

//2. route
const dataRoute = require('./Routes/data.route');


//3. connect
const connect = require("./config/db");

//4. port
const PORT = process.env.PORT;

//5. create app
const app = express();

//6. App use
app.use(express.json());
app.use(cors());
app.use("/data", dataRoute);


app.get("/", async (req, res) => {
    res.send("Hello from data base");
})

//7. listen
app.listen(PORT, async () => {
    await connect();
    console.log(`Listening on http://localhost:${PORT}`)
})