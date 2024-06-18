const express = require("express");
const {
  addYouthEnterprise,
  getYouthEnterprises,
  getYouthEnterprise,
  updateYouthEnterprise,
  deleteYouthEnterprise,
} = require("../controllers/youthEnterprise.controller.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, addYouthEnterprise);
router.get("/", getYouthEnterprises);
router.get("/:id", getYouthEnterprise);
router.put("/:id", verifyToken, updateYouthEnterprise);
router.delete("/:id", verifyToken, deleteYouthEnterprise);

module.exports = router;
