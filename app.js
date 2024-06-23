const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
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
    "http://127.0.0.1:4000",
    "http://localhost:5173",
    "http://192.168.100.10:5173",
    "http://127.0.0.1:5173",
    "https://property-listing.fergamitechnologies.com",
    "https://fergamitechnologies.com",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
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
app.use('/youth-enterprises', youthEnterpriseRoutes);
app.use('/auth', auth);
app.use('/requests', requestRoutes);
app.use('/chats', chatRoutes);
app.use('/offers', offerRoutes);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('sendMessage', (message) => {
    io.to(message.room).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("Server is running! on port", PORT);
});
