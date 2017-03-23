import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_USER,
  addUser,
  LOGIN_USER,
  loginUser,
  AUTHENTICATE_SESSION,
  authenticateSession,
  LOGOUT_USER,
  logoutUser
} from '../UserActions';

const user = { '_id': '589201f691293665a65538df', 'cuid': 'piyn4gkh900002us7yyn1nejq', 'firstName': 'Tester', 'lastName': 'Testee', 'studentId': 12345678, 'email': 'dylangfernandes@gmail.com', 'password': 'bed4efa1d4fdbd954bd3705d6a2a78270ec9a52ecfbfb010c61862af5c76af1761ffeb1aef6aca1bf5d02b3781aa854fabd2b69c790de74e17ecfec3cb6ac4bf', '__v': 0, 'lastLogin': null, 'dateAdded': '2017-02-01T15:42:46.687Z' };
const user2 = { '_id': '589201f691293665a65538df', 'cuid': 'piyn4gkh900002us7yyn1nejq'};
const response = { 'statusCode': 200};
const user3 ={'cuid': 'piyn4gkh900002us7yyn1nejq'};
var authenticate;

test('should return the correct type for addUser', actionTest(
  addUser,
  user,
  { type: ADD_USER, user },

));

test('should return the correct type for loginUser', actionTest(
  loginUser,
  [user2],
  { type: LOGIN_USER, response: [user2] },

));
test('should return the correct type for authenticateSession', actionTest(
  authenticateSession,
  [user2],
   authenticate,

));

test('should return the correct type for logoutUser', actionTest(
  logoutUser,
  [user2],
   { type: LOGOUT_USER, response: [user2] },

));
