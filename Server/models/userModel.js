const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  docId: { type: String, required: true },
  fileName: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  docs: { type: [DocumentSchema], default: [] },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

