
import { Router } from 'express';
import * as StudyGroupController from '../controllers/studyGroup.controller';
import ensureAuthenticated from '../util/passportUtils';
const router = new Router();

// Get all Study Groups
router.route('/').get(ensureAuthenticated, StudyGroupController.getStudyGroups);

// Get Study Group by guid
router.route('/:guid').get(ensureAuthenticated, StudyGroupController.getStudyGroup);

// Create a new Study Group
router.route('/').post(ensureAuthenticated, StudyGroupController.createStudyGroup);

// Delete Study Group by guid
router.route('/:guid').delete(ensureAuthenticated, StudyGroupController.deleteStudyGroup);

// Get a study group's messages
router.route('/:guid/messages').get(ensureAuthenticated, StudyGroupController.getStudyGroupMessages);

// Add a message to a study group
router.route('/:guid/addMessage').put(ensureAuthenticated, StudyGroupController.addMessageToStudyGroup);

// Delete a study group's messages
router.route('/:guid/deleteMessages').delete(ensureAuthenticated, StudyGroupController.deleteStudyGroupMessages);

export default router;
