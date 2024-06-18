const { Request, User, YouthEnterprise } = require('../models');

const addRequest = async (req, res) => {
  const { description, requesterId, enterpriseId } = req.body;

  try {
    const requester = await User.findByPk(requesterId);
    if (!requester) {
      return res.status(404).json({ message: "Requester not found" });
    }

    const enterprise = await YouthEnterprise.findByPk(enterpriseId);
    if (!enterprise) {
      return res.status(404).json({ message: "Youth enterprise not found" });
    }

    const newRequest = await Request.create({
      description,
      requesterId,
      enterpriseId,
      status: 'pending',
    });

    res.status(201).json({ message: "Request created successfully", request: newRequest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create request!" });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.status(200).json(requests);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get requests!" });
  }
};

const getRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(request);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get request!" });
  }
};

const updateRequest = async (req, res) => {
  const id = req.params.id;
  const { description, status, enterpriseId } = req.body;

  try {
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.set({ description, status, enterpriseId });
    await request.save();

    res.status(200).json(request);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update request!" });
  }
};

const deleteRequest = async (req, res) => {
  const id = req.params.id;

  try {
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await request.destroy();
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete request!" });
  }
};

module.exports = {
  addRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
};
