const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Budget", budgetSchema);