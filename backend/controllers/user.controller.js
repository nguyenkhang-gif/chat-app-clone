import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    // select bỏ qua id của ng dùng
    //có thể lấy hết const filteredUsers = await User.find({ _id: { $ne: loggedInUser } });
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (e) {
    console.log("getMessages error :", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
