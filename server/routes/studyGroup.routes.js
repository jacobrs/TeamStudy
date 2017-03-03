import { Router } from 'express';
import * as StudyGroupController from '../controllers/studyGroup.controller';
const router = new Router();

// Get all Study Groups
router.route('/').get(StudyGroupController.getStudyGroups);

// Get Study Group by cuid
router.route('/:guid').get(StudyGroupController.getStudyGroup);

// Create a new Study Group
router.route('/').post(StudyGroupController.createStudyGroup);

// Delete Study Group by cuid
router.route('/:guid').delete(StudyGroupController.deleteStudyGroup);

export default router;
