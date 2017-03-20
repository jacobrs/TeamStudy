import { Router } from 'express';
import * as MessageController from '../controllers/message.controller';
import ensureAuthenticated from '../util/passportUtils';
const router = new Router();

// Save a message to the database
router.route('/').post(ensureAuthenticated, MessageController.saveMessage);

// Get all messages
router.route('/').get(ensureAuthenticated, MessageController.getAllMessages);

// Get messages belonging to a specific study group
router.route('/:studyGroup').get(ensureAuthenticated, MessageController.getMessagesFromStudyGroup);

// Delete all messages
router.route('/').delete(ensureAuthenticated, MessageController.deleteAllMessages);

// Delete messages belonging to a specific study group
router.route('/:studyGroup').delete(ensureAuthenticated, MessageController.deleteMessagesFromStudyGroup);

export default router;
