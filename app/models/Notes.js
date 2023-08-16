const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Notes = mongoose.model("Notes", notesSchema);
module.exports= Notes
