import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Create new message document
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (!conversation) {
      // Create new conversation if it doesn't exist
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id] // Store the ObjectId reference
      });
    } else {
      // Add message reference to existing conversation
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    // If you need the populated message data for the response
    const populatedMessage = await Message.findById(newMessage._id);

    // Handle socket emission
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    res.status(201).json(populatedMessage);

  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate({
      path: 'messages',
      select: 'senderId receiverId message createdAt' // Specify fields you want
    });

    if (!conversation) {
      return res.status(200).json([]); // Changed to 200 since empty array is valid
    }

    res.status(200).json(conversation.messages);

  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};