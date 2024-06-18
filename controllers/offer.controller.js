const { Offer, Chat } = require('../models');

const addOffer = async (req, res) => {
  const { amount, terms, chatId } = req.body;

  try {
    const chat = await Chat.findByPk(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const newOffer = await Offer.create({
      amount,
      terms,
      chatId,
    });

    res.status(201).json({ message: "Offer created successfully", offer: newOffer });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create offer!" });
  }
};

const getOffersByChatId = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const offers = await Offer.findAll({ where: { chatId } });
    res.status(200).json(offers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get offers!" });
  }
};

const getOffer = async (req, res) => {
  const id = req.params.id;
  try {
    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json(offer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get offer!" });
  }
};

const updateOffer = async (req, res) => {
  const id = req.params.id;
  const { amount, terms, accepted } = req.body;

  try {
    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    offer.set({ amount, terms, accepted });
    await offer.save();

    res.status(200).json(offer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update offer!" });
  }
};

const deleteOffer = async (req, res) => {
  const id = req.params.id;

  try {
    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    await offer.destroy();
    res.status(200).json({ message: "Offer deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete offer!" });
  }
};

module.exports = {
  addOffer,
  getOffersByChatId,
  getOffer,
  updateOffer,
  deleteOffer,
};
