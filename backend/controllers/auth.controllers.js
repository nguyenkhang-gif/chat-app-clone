import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ error: "Username exit!!!!!" });
    }
    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyImg : girlImg,
    });
    if (newUser) {
      //
      generateTokenAndCookie(newUser._id, res);
      await newUser.save();
      console.log(newUser);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (e) {
    console.log("signup error: ", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordCorrect || !user) {
      return res
        .status(400)
        .json({ error: "Invalid username or password error" });
    }

    generateTokenAndCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (e) {
    console.log("login error: ", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout success" });
  } catch (e) {
    console.log("logout error: ", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
