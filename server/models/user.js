import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  cuid: { type: 'String', required: true },
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  studentId: { type: 'Number', required: true },
  password: { type: 'String', required: true },
  email: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  lastLogin: { type: 'Date', default: null, required: false },
});

export default mongoose.model('user', userSchema);
