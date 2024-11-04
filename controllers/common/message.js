import Message from "../../models/message.js";
import Conversation from "../../models/conversation.js";

export const sendMessaage = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(404).json({ message: "All fields are must required" });
  }

  const msg = await Message(data);
  await msg.save();

  if (msg) {
    res.status(200).json({ message: "success" });
  }
};

export const conversation = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(404).json({ message: "All fields are must required" });
  }

  const con = await Conversation(data);
  await con.save();
  if (con) {
    res.status(200).json({ message: "success" });
  }
};
