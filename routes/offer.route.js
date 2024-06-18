const express = require("express");
const {
  addOffer,
  getOffersByChatId,
  getOffer,
  updateOffer,
  deleteOffer,
} = require("../controllers/offer.controller.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, addOffer);
router.get("/chat/:chatId", getOffersByChatId);
router.get("/:id", getOffer);
router.put("/:id", verifyToken, updateOffer);
router.delete("/:id", verifyToken, deleteOffer);

module.exports = router;
