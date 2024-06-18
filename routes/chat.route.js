const express = require("express");
const {
  addChat,
  getChatsByRequestId,
  getChat,
  updateChat,
  deleteChat,
} = require("../controllers/chat.controller.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, addChat);
router.get("/request/:requestId", getChatsByRequestId);
router.get("/:id", getChat);
router.put("/:id", verifyToken, updateChat);
router.delete("/:id", verifyToken, deleteChat);

module.exports = router;
