const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const register = async (req, res) => {
  console.log(req.body);
  const { username, email, phone, password, gender, dob, profession,role,requestedAdminRole } = req.body;

  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      gender,
      dob,
      profession,
      role,
      requestedAdminRole
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // FIND THE USER IN THE DATABASE
    const user = await User.findOne({ where: { username } });

    // CHECK IF THE USER EXISTS
    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY, // Replace with your JWT secret key
      { expiresIn: "7d" }, // Token expires in 7 days
    );

    // Send the token as a cookie and user info as JSON response
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        // sameSite: "Lax",
        secure: false,
      })
      .json({
        success: true,
        user: { id: user.id, username: user.username, email: user.email },
      });

    // console.log(user.id);
    // secure: true, // Uncomment if using HTTPS
    // maxAge: 1000 * 60 * 60 * 24 * 7, // Token expires in 7 days
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

const logout = (req, res) => {
  // Clear the token cookie and send logout message
  res.clearCookie("token").status(200).json({ success:true, message: "Logout Successful" });
};

module.exports = {
  register,
  login,
  logout,
};
