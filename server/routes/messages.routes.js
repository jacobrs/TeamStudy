import { Router } from 'express';
import * as MessagesController from '../controllers/messages.controller';
const router = new Router();

// get all messages
router.route('/').get(MessagesController.getAllMessages);

// send a new message
router.route('/').post(MessagesController.sendMessage);

export default router;
