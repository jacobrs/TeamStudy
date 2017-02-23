import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import ensureAuthenticated from '../util/passportUtils';
const router = new Router();
const passport = require('passport');

// Get all Users
router.route('/').get(UserController.getUsers);

// Get User by cuid
router.route('/:cuid').get(ensureAuthenticated, UserController.getUser);

// Add a new User
router.route('/').post(UserController.addUser);

// Update User by cuid
router.route('/:cuid').put(ensureAuthenticated, UserController.updateUser);

// Delete User by cuid
router.route('/:cuid').delete(UserController.deleteUser);

// Login User
router.route('/login').post(passport.authenticate('local'), UserController.loginUser);

//  Get User study groups
router.route('/:cuid/studyGroups').get(UserController.getUserStudyGroups);

//  Add User study group
router.route('/:cuid/studyGroups').put(UserController.addUserStudyGroups);

//  Delete User study groups
router.route('/:cuid/studyGroups').delete(UserController.deleteUserStudyGroups);

export default router;
