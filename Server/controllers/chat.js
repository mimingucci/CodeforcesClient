const {
  save,
  getById,
  deleteUserFromChat,
  addUserToChat,
  deleteById,
  individualChat,
} = require("../repositories/chat");
const { addToChat, deleteFromChat } = require("../repositories/user");
const asyncHandler = require("express-async-handler");
const { MissingFieldsError } = require("../errors/input");
const { UserNotFoundError } = require("../errors/user");
const { userExists } = require("../services/user");
const { default: mongoose } = require("mongoose");
const { chatExists } = require("../services/chat");
const User = require("../models/user");
const Chat = require("../models/chat");

const createChat = asyncHandler(async (req, res) => {
  if (!req.body.users || req.body.users.length == 0 || !req.body.name)
    throw new MissingFieldsError("Push user in chat room");
  let valid = true;
  req.body.users.forEach(async (user) => {
    valid = await userExists({ id: mongoose.Types.ObjectId(user) });
    if (!valid) throw new Error(`Cannot find user with id ${user}`);
  });
  const rs = await save({ users: req.body.users, name: req.body.name });
  req.body.users.forEach(async (user) => {
    let u = await User.findByIdAndUpdate(mongoose.Types.ObjectId(user), {
      $push: { chats: rs?._id },
    });
    // u.chats.push(rs._id);
    // await u.save();
  });
  return res.status(200).json({
    status: rs ? "success" : "failure",
    data: rs ? rs : "Cannot create new chat room",
  });
});

const deleteChat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new MissingFieldsError("Missing id chat room field");
  let e = await chatExists(mongoose.Types.ObjectId(id));
  if (!e)
    return res.status(200).json({
      status: "success",
    });
  const rs = await deleteById(mongoose.Types.ObjectId(id));
  return res.json({
    status: rs ? "success" : "failure",
  });
});

const getChatsForUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("chats");

    return res.status(200).json({
      status: "success",
      data: user.chats,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      data: error.message,
    });
  }
});

const getMessagesForSpecificChat = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(mongoose.Types.ObjectId(id)).select(
      "members"
    );
    const lastMessage = await Message.findOne({
      chatId: id,
    });
    return res.status(200).json({
      status: "success",
      data: {
        chat,
        lastMessage,
      },
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      status: "failure",
      data: error.message,
    });
  }
});

const addChat = asyncHandler(async (req, res) => {
  const { user, chat } = req.body;
  if (!user || !chat) throw new MissingFieldsError("Required user and chat id");
  const rs = await addUserToChat({ chat, user });
  const result = await addToChat({ id: user, chat });
  return res.json({
    status: rs ? "success" : "failure",
    data: rs,
  });
});

const removeChat = asyncHandler(async (req, res) => {
  const { user, chat } = req.body;
  if (!user || !chat) throw new MissingFieldsError("Required user and chat id");
  const rs = await deleteUserFromChat({ chat, user });
  const result = await deleteFromChat({ id: user, chat });
  return res.json({
    status: "success",
  });
});

const openIndividualChat = asyncHandler(async (req, res) => {
  if (
    !req.user._id ||
    !req.user.username ||
    !req.body._id ||
    !req.body.username
  )
    throw new MissingFieldsError("Required username and id");
  const rs = await individualChat({
    id1: req.user._id,
    id2: mongoose.Types.ObjectId(req.body._id),
    name1: req.user.username,
    name2: req.body.username,
  });
  return res.json({
    status: rs ? "success" : "failure",
    data: rs ? rs : "Cannot open chat room",
  });
});

module.exports = {
  createChat,
  deleteChat,
  getChatsForUser,
  getMessagesForSpecificChat,
  addChat,
  removeChat,
  openIndividualChat,
};
