const mongoose = require("mongoose");

const TimerSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    userId: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
);

const Timer = mongoose.model("Timer", TimerSchema);

module.exports = Timer;
