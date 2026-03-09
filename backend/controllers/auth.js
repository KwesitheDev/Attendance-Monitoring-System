const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Department = require("../models/Department");

const register = async (req, res) => {
  const { name, code, email, password, role, department, year } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { code }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      code,
      email,
      password: hashedPassword,
      role,
      department,
      year: role === "student" ? year : undefined,
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    // re-fetch with populated department before sending
    const populatedUser = await User.findById(user._id).populate(
      "department",
      "name code",
    );
    res.status(201).json({
      token,
      user: {
        id: populatedUser._id,
        name: populatedUser.name,
        email: populatedUser.email,
        role: populatedUser.role,
        department: populatedUser.department,
        year: populatedUser.year,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate(
      "department",
      "name code",
    );
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email,
        role: user.role,
        department: user.department,
        year: user.year,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("department", "name code");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      year: user.year,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching departments", error });
  }
};

module.exports = { register, login, getUser, getDepartments };
