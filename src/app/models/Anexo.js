const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnexoSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  documento: {
    type: String,
    required: true
  },
  tipo: {
    type: String
  },
  arquivo: {
    type: String,
    required: true
  },
  criadoEm: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Anexo", AnexoSchema);
