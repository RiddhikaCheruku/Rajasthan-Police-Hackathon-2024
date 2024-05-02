const mongoose = require("mongoose");

const { Schema } = mongoose;

const hashSchema = new Schema({
  value: String,
});

const hashModel = mongoose.model("Hash", hashSchema);

module.exports = hashModel;
