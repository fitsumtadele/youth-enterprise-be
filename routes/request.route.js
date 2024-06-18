const express = require("express");
const {
  addRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
} = require("../controllers/request.controller.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, addRequest);
router.get("/", getRequests);
router.get("/:id", getRequest);
router.put("/:id", verifyToken, updateRequest);
router.delete("/:id", verifyToken, deleteRequest);

module.exports = router;
