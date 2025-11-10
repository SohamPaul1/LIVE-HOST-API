const express = require("express");
const app = express();
const connectDB = require("./db/data");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const data_routes = require("./routes/data");

app.get("/", (req, res) => {
    res.send("Hi !");
});

//middleware
app.use(express.json());
app.use("/api", data_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Connected to ${PORT}`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

start();