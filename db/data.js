const { default: mongoose } = require("mongoose");

const connectDB = (uri) => {
    console.log("DB connected");
    console.log(uri);
    return mongoose.connect(uri);
};

module.exports = connectDB;