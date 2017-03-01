import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	messageID: {type: 'String', required: true},?????
	channelID: {type: 'String', required: true},
	messageContent: {type: 'String', required: true},
	dateSent: {type: 'Date', default: Date.now, required: true},
	user: {type: 'Object', required: true},
});

export default mongoose.model('message', messageSchema);