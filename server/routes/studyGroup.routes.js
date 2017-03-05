import { Router } from 'express';
import * as StudyGroupController from '../controllers/studyGroup.controller';
const router = new Router();

// Get all Study Groups
router.route('/').get(StudyGroupController.getStudyGroups);

// Get Study Group by guid
router.route('/:guid').get(StudyGroupController.getStudyGroup);

// Create a new Study Group
router.route('/').post(StudyGroupController.createStudyGroup);

// Delete Study Group by guid
router.route('/:guid').delete(StudyGroupController.deleteStudyGroup);

// Get a study group's messages
router.route('/:guid/messages').get(StudyGroupController.getStudyGroupMessages);

// Add a message to a study group
router.route('/:guid/addMessage').put(StudyGroupController.addMessageToStudyGroup);

// Delete a study group's messages
router.route('/:guid/deleteMessages').delete(StudyGroupController.deleteStudyGroupMessages);

export default router;
