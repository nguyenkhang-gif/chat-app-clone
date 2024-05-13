import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  console.log("message send", req.params.id);
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log([senderId, receiverId]);

    let conversation = await Conversation.findOne({
      // bao gồm sender và receiver id
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // doesnt have conservation so create one
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        // message default is empty
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    console.log(newMessage);
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // SOCKET IO IS PLANNED TO BE HERE

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (e) {
    console.log("sendMessage error :", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
    // console.log(conversation);
  } catch (e) {
    console.log("getMessages error :", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
