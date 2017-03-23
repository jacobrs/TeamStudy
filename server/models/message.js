import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  cuid: { type: 'String', required: true },
  dateSent: { type: 'Date', default: Date.now, required: true },
  messageContent: { type: 'String', required: true },
  author: { type: 'String', required: true },
  studyGroup: { type: 'String', required: true },
});

export default mongoose.model('message', messageSchema);
