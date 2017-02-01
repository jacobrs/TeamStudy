import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import ensureAuthenticated from "../util/passportUtils";
const router = new Router();
const passport = require('passport');

// Get all Users
router.route('/').get(UserController.getUsers);

// Get User by cuid
router.route('/:cuid').get(ensureAuthenticated, UserController.getUser);

// Add a new User
router.route('/').post(UserController.addUser);

// Delete User by cuid
router.route('/:cuid').delete(UserController.deleteUser);

// Login User
router.route('/login').post(passport.authenticate('local'), UserController.loginUser);

export default router;
