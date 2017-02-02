import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  LOGIN_USER,
  loginUser,
} from '../UserActions';

const user = {  'email': 'dylangfernandes@gmail.com', 'password': 'bed4efa1d4fdbd954bd3705d6a2a78270ec9a52ecfbfb010c61862af5c76af1761ffeb1aef6aca1bf5d02b3781aa854fabd2b69c790de74e17ecfec3cb6ac4bf'};

test('should return the correct type for loginUser', actionTest(
  loginUser,
  user,
  { type: LOGIN_USER, response: user },
));

