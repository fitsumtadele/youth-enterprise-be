const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require('./routes/user.route');
const youthEnterpriseRoutes = require('./routes/youthEnterprise.route');
const requestRoutes = require('./routes/request.route');
const chatRoutes = require('./routes/chat.route');
const offerRoutes = require('./routes/offer.route');
const auth = require('./routes/auth.route');
const dotenv = require("dotenv").config();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.2.115:3000",
    "http://localhost:5173",
    "http://192.168.100.10:5173",
    "http://127.0.0.1:5173",
 
  ], // Allow requests from this origin
  // origin: '*',
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200, // Respond with 200 to OPTIONS requests
  allowedHeaders: ["Content-Type", "Authorization"],
};
const app = express();
app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions)); 

const PORT = process.env.PORT || 4000;

// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

console.log('Static files served from:', path.join(__dirname, 'img'));
app.use('/img', express.static(path.join(__dirname, 'img'), {
  setHeaders: (res, path, stat) => {
    console.log('Serving file:', path);
  }
}));
app.use('/users', userRoutes);
app.use('/auth', auth);
app.use('/youth-enterprises', youthEnterpriseRoutes);
app.use('/requests', requestRoutes);
app.use('/chats', chatRoutes);
app.use('/offers', offerRoutes);

app.listen(PORT, () => {
  console.log("Server is running! on port", PORT);
});
