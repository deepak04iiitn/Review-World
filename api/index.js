import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import messageRoutes from './routes/message.route.js';
import authRoutes from './routes/auth.route.js';
import reviewRoutes from './routes/review.route.js';
import commentRoutes from './routes/comment.route.js';
import pollRoutes from './routes/poll.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { app, server } from "./SocketIO/server.js";


dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected!');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

// const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/message', messageRoutes);


// Ping endpoint to keep backend awake
app.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
});


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error!';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
