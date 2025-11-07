const Data = require("../models/data");

const getAllData = async (req, res) => {
    const { user_id } = req.query;
    const queryObject = {};

    if (user_id) {
        queryObject.user_id = user_id;
    }

    const user_data = await Data.find(queryObject);
    res.status(200).json({ user_data });
}

const getAllDataTest = async (req, res) => {
    const user_data = await Data.find(req.query);
    res.status(200).json({ user_data });
}

const updateUserData = async (req, res) => {
    try {
        const { userId } = req.params;
        const { plan } = req.body;

        if (!plan) {
            return res.status(400).json({ msg: "Please provide a 'plan'" });
        }

        const updatedUser = await Data.findOneAndUpdate(
            { user_id: userId },
            { plan: plan, last_updated: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: `No user found with user_id: ${userId}` });
        }

        res.status(200).json({ msg: "User updated successfully", data: updatedUser });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

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
        const { userId } = req.params;

        const deletedUser = await Data.findOneAndDelete({ user_id: userId });

        if (!deletedUser) {
            return res.status(404).json({ msg: `No user found with user_id: ${userId}` });
        }

        res.status(200).json({ msg: "User deleted successfully", data: deletedUser });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

module.exports = {
    getAllData,
    getAllDataTest,
    updateUserData,
    createUserData,
    deleteUserData
};