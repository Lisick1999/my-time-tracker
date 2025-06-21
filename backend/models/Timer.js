const mongoose = require("mongoose");

const TimerSchema = mongoose.Schema(
  {
    duration: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Timer = mongoose.model("Timer", TimerSchema);

module.exports = Timer;
