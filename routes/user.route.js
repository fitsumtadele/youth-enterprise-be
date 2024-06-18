const express = require("express");
const {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  getSingleUser,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const router = express.Router();

router.get("/", getUsers);
router.get("/getSingleUser", verifyToken, getSingleUser);
router.get("/", getUsers);
router.get("/search/:id", verifyToken, getUser);
router.put("/updateUser", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
