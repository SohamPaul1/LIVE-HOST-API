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


// It's not required for your main API to run. Your main API is app.js.

// The dataDB.js file is a utility script, often called a "seeder" script.

// Its only purpose is to populate your database with the test data from data.json.

// Here's what it does when you run it (e.g., by typing node dataDB.js in your terminal):

// Connects to your MongoDB.

// Deletes all users currently in the database (data.deleteMany()).

// Creates a fresh set of users from your data.json file (data.create(dataJson)).

// You only run this script one time to set up your database or whenever you want to reset your database for testing. Your app.js server just reads and writes data; it doesn't add the initial test data