const mongoose = require("mongoose")

const { Schema } = mongoose

const objectiveSchema = new Schema({
  isCompleted: { type: Boolean },
  name: { type: String },
})

module.exports = mongoose.model("Objective", objectiveSchema)
