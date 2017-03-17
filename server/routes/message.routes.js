import { Router } from 'express';
import * as MessageController from '../controllers/message.controller';
const router = new Router();

// Save a message to the database
router.route('/').post(MessageController.saveMessage);

// Get all messages
router.route('/').get(MessageController.getAllMessages);

// Get messages belonging to a specific study group
router.route('/:studyGroup').get(MessageController.getMessagesByStudyGroup);

// Delete all messages
router.route('/').delete(MessageController.deleteAllMessages);

// Delete messages belonging to a specific study group
router.route('/:studyGroup').delete(MessageController.deleteMessagesByStudyGroup);

export default router;
