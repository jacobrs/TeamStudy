import mongoose from 'mongoose';
import message from './message';
const Schema = mongoose.Schema;

const studyGroupSchema = new Schema({
  guid: { type: 'String', required: true },
  groupName: { type: 'String', required: true },
  course: { type: 'String', required: true },
  teacher: { type: 'String', required: true },
  description: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  chatMessages: ['message']
});

export default mongoose.model('studyGroup', studyGroupSchema);
