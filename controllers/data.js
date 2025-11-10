const Data = require("../models/data");

// 1. GET USER DATA by id
const getAllData = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ msg: "Please provide a user_id in the query" });
    }

    const user_data = await Data.findOne({ user_id: user_id }); // Use findOne for a single user

    if (!user_data) {
        return res.status(404).json({ msg: `No user found with user_id: ${user_id}` });
    }

    res.status(200).json({ user_data });
}

const getAllUsers = async (req, res) => {
    const user_data = await Data.find(req.query);
    res.status(200).json({ user_data });
}

// 3. UPDATE USER DATA
const updateUserData = async (req, res) => {
    try {
        const { user_id, plan } = req.body;

        if (!user_id || !plan) {
            return res.status(400).json({ msg: "Please provide a 'user_id' and a 'plan' in the body" });
        }

        const updatedUser = await Data.findOneAndUpdate(
            { user_id: user_id },
            { plan: plan, last_updated: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: `No user found with user_id: ${user_id}` });
        }

        res.status(200).json({ msg: "User updated successfully", data: updatedUser });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

// 2. CREATE USER DATA
const createUserData = async (req, res) => {
    try {
        const newUser = await Data.create(req.body);
        res.status(201).json({ msg: "User created successfully", data: newUser });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

const deleteUserData = async (req, res) => {
    try {
        const { user_id } = req.query; // <-- Get user_id from query

        if (!user_id) {
            return res.status(400).json({ msg: "Please provide a user_id in the query" });
        }

        const deletedUser = await Data.findOneAndDelete({ user_id: user_id });

        if (!deletedUser) {
            return res.status(404).json({ msg: `No user found with user_id: ${user_id}` });
        }

        res.status(200).json({ msg: "User deleted successfully", data: deletedUser });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

module.exports = {
    getAllData,
    getAllUsers,
    updateUserData,
    createUserData,
    deleteUserData
};