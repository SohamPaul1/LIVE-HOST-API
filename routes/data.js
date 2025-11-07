const express = require("express");
const router = express.Router();

const {
    getAllData,
    getAllDataTest,
    updateUserData,
    createUserData,
    deleteUserData
} = require("../controllers/data");

router.route("/")
    .get(getAllData)
    .post(createUserData);

router.route("/test").get(getAllDataTest);

router.route("/:userId")
    .patch(updateUserData)
    .delete(deleteUserData);

module.exports = router;