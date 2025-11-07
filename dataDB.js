require("dotenv").config();
const connectDB = require("./db/data");
const data = require("./models/data");

const dataJson = require("./data.json")

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await data.deleteMany();
        await data.create(dataJson);
        console.log("Success");
    }
    catch (error) {
        console.log(error);
    }
};

start();