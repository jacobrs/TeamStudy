import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	                    cuid: { type: 'String', required: true },
	                    messageContent: { type: 'String', required: true },
	                    dateSent: { type: 'Date', default: Date.now, required: true },

	                    author: { type: 'Object', required: true },
	                    studyGroup: { type: 'Object', required: true },
});

export default mongoose.model('message', messageSchema);
