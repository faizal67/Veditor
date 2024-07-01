const mongoose = require('mongoose');
const QuillDelta = require('quill-delta');

const documentSchema = new mongoose.Schema({
  documentId: { type: String, required: true, unique: true },
  content: { type: Object, required: true, default: new QuillDelta() },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;