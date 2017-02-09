import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_USER,
  addUser,
} from '../UserActions';

const user = { '_id': '589201f691293665a65538df', 'cuid': 'piyn4gkh900002us7yyn1nejq', 'firstName': 'Tester', 'lastName': 'Testee', 'studentId': 12345678, 'email': 'dylangfernandes@gmail.com', 'password': 'bed4efa1d4fdbd954bd3705d6a2a78270ec9a52ecfbfb010c61862af5c76af1761ffeb1aef6aca1bf5d02b3781aa854fabd2b69c790de74e17ecfec3cb6ac4bf', '__v': 0, 'lastLogin': null, 'dateAdded': '2017-02-01T15:42:46.687Z' };

test('should return the correct type for addUser', actionTest(
  addUser,
  user,
  { type: ADD_USER, user }

));

