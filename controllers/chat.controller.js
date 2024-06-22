const { Chat, User, Request } = require('../models');

const addChat = async (req, res) => {
  const { message, senderId, receiverId, requestId } = req.body;

  try {
    const sender = await User.findByPk(senderId);
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const request = await Request.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const newChat = await Chat.create({
      message,
      senderId,
      receiverId,
      requestId,
    });

    res.status(201).json({ message: "Chat created successfully", chat: newChat });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create chat!" });
  }
};

const getChatsByRequestId = async (req, res) => {
  const requestId = req.params.requestId;

  // Check if requestId is a valid UUID
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(requestId)) {
    return res.status(400).json({ message: "Invalid request ID format" });
  }

  try {
    const chats = await Chat.findAll({ where: { requestId } });
    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

const getChat = async (req, res) => {
  const id = req.params.id;
  try {
    const chat = await Chat.findByPk(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

const updateChat = async (req, res) => {
  const id = req.params.id;
  const { message } = req.body;

  try {
    const chat = await Chat.findByPk(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.set({ message });
    await chat.save();

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update chat!" });
  }
};

const deleteChat = async (req, res) => {
  const id = req.params.id;

  try {
    const chat = await Chat.findByPk(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await chat.destroy();
    res.status(200).json({ message: "Chat deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete chat!" });
  }
};

module.exports = {
  addChat,
  getChatsByRequestId,
  getChat,
  updateChat,
  deleteChat,
};
