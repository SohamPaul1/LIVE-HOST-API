const express = require("express");
const router = express.Router();

const {
    getAllData,
    getAllUsers,
    updateUserData,
    createUserData,
    deleteUserData
} = require("../controllers/data");

// 1. GET user data by id
router.route("/get_data").get(getAllData);

// 2. Create new user data
router.route("/add_data").post(createUserData);

// 3. Update existing data
router.route("/edit_data").post(updateUserData);

// 4. DELETE user data
router.route("/delete_data").delete(deleteUserData);

// 5. GET ALL USER DATA (NEW ROUTE)
router.route("/get_all_user_data").get(getAllUsers);

module.exports = router;