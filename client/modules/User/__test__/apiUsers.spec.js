import test from 'ava';
import callApi, { API_URL } from '../../../util/apiCaller';
import nock from 'nock';

test('sends the body', t => {
  const body = { id: 5 };
  const user = { nickname: 'foo bar', studentId: '12345678', email: 'test@test.com', password: 'password123' };
  nock(API_URL)
    .post('/registration', user)
    .reply(200, user);
  return callApi('user', 'post', user).then(response => {
    t.deepEqual(response, user);
  });
});

// test('method defaults to GET', t => {
//   const reply = { users: '{"_id":"589201f691293665a65538df","cuid":"ciyn4gkh900002us7yyn1nejq","firstName":"Dylan","lastName":"Fernandes","studentId":40002559,"email":"dylangfernandes@gmail.com","password":"bed4efa1d4fdbd954bd3705d6a2a78270ec9a52ecfbfb010c61862af5c76af1761ffeb1aef6aca1bf5d02b3781aa854fabd2b69c790de74e17ecfec3cb6ac4bf","__v":0,"lastLogin":null,"dateAdded":"2017-02-01T15:42:46.687Z"}' };
//   nock(API_URL)
//     .get('api/users')
//     .reply(200, reply);
//   return callApi('foo').then(response => {
//     t.deepEqual(response, reply);
//   });
// });


// test('returns the error', t => {
//   const reply = { message: 'Errrrrrrrrr' };
//   nock(API_URL)
//     .get('/send_error')
//     .reply(500, reply);
//   return callApi('send_error').then(error => {
//     t.deepEqual(error, reply);
//   });
// });
