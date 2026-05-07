const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://poojashekar32_db_user:Papuu%4038@cluster0.k1zhpey.mongodb.net/financeDB?retryWrites=true&w=majority")
  .then(() => console.log("Database connected ✅"))
  .catch(err => console.log(err));

// ✅ Models (FIXED)
const Expense = require("./models/Expense");
const User = require("./models/User");
const Budget = require("./models/Budget"); // ✅ CORRECT

// 🔐 Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

// ---------------- ROUTES ----------------

// Test
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Register
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.send("User registered successfully ✅");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token });

  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Expense (USER-SPECIFIC)
app.post("/add", authMiddleware, async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,
      userId: req.userId
    });

    await newExpense.save();
    res.send("Expense added successfully ✅");

  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Expenses (USER-SPECIFIC)
app.get("/expenses", authMiddleware, async (req, res) => {
  try {
    const data = await Expense.find({ userId: req.userId }).sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Budget APIs
app.post("/budget", authMiddleware, async (req, res) => {
  const { category, amount } = req.body;

  let budget = await Budget.findOne({
    userId: req.userId,
    category
  });

  if (budget) {
    budget.amount = amount;
    await budget.save();
  } else {
    budget = new Budget({
      category,
      amount,
      userId: req.userId
    });
    await budget.save();
  }

  res.send("Budget saved ✅");
});

app.get("/budget", authMiddleware, async (req, res) => {
  const data = await Budget.find({ userId: req.userId });
  res.json(data);
});

// AI Insights
app.post("/insights", (req, res) => {
  const data = req.body || [];

  if (!Array.isArray(data) || data.length === 0) {
    return res.json({ message: "Add some expenses to get insights." });
  }

  let total = 0;
  const categoryTotals = {};

  data.forEach((item) => {
    const amt = Number(item.amount) || 0;
    total += amt;

    const cat = item.category || "Other";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
  });

  const topCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  const topAmount = categoryTotals[topCategory];

  const tips = [
    `You’re spending the most on "${topCategory}" (₹${topAmount}). Consider reducing this category.`,
    `Your total spending is ₹${total}. Try setting a monthly budget and save at least 20%.`,
    total > 5000
      ? "Your spending seems high. Track daily expenses and cut non-essential costs."
      : "Good job keeping spending moderate. Try to increase savings gradually."
  ];

  res.json({ message: tips.join("\n") });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});