const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'archived'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
