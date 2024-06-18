const { YouthEnterprise, User } = require('../models');

const addYouthEnterprise = async (req, res) => {
  const { name, location, description, userId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newYouthEnterprise = await YouthEnterprise.create({
      name,
      location,
      description,
      userId,
    });

    res.status(201).json({ message: "Youth enterprise created successfully", youthEnterprise: newYouthEnterprise });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create youth enterprise!" });
  }
};

const getYouthEnterprises = async (req, res) => {
  try {
    const youthEnterprises = await YouthEnterprise.findAll();
    res.status(200).json(youthEnterprises);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get youth enterprises!" });
  }
};

const getYouthEnterprise = async (req, res) => {
  const id = req.params.id;
  try {
    const youthEnterprise = await YouthEnterprise.findByPk(id);
    if (!youthEnterprise) {
      return res.status(404).json({ message: "Youth enterprise not found" });
    }
    res.status(200).json(youthEnterprise);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get youth enterprise!" });
  }
};

const updateYouthEnterprise = async (req, res) => {
  const id = req.params.id;
  const { name, location, description } = req.body;

  try {
    const youthEnterprise = await YouthEnterprise.findByPk(id);
    if (!youthEnterprise) {
      return res.status(404).json({ message: "Youth enterprise not found" });
    }

    youthEnterprise.set({ name, location, description });
    await youthEnterprise.save();

    res.status(200).json(youthEnterprise);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update youth enterprise!" });
  }
};

const deleteYouthEnterprise = async (req, res) => {
  const id = req.params.id;

  try {
    const youthEnterprise = await YouthEnterprise.findByPk(id);
    if (!youthEnterprise) {
      return res.status(404).json({ message: "Youth enterprise not found" });
    }

    await youthEnterprise.destroy();
    res.status(200).json({ message: "Youth enterprise deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete youth enterprise!" });
  }
};

module.exports = {
  addYouthEnterprise,
  getYouthEnterprises,
  getYouthEnterprise,
  updateYouthEnterprise,
  deleteYouthEnterprise,
};
