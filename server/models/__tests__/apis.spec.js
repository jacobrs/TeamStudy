import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial users added into test db
const users = [
  new User({ firstName: 'Rock', lastName: 'Lee', studentId: '99993333', email: 'rock@gmail.com', password: 'PPPPPPPp1' }),
  new User({ firstName: 'Sasuke', lastName: 'Uchiha', studentId: '55556666', email: 'sasuke@gmail.com', password: 'Asdfr123' }),
];

test.beforeEach('connect and add two user entries', t => {
  connectDB(t, () => {
    User.create(users, err => {
      if (err) t.fail('Unable to create users');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});

//* ************
// User
//* ************

test.serial('Should correctly create a new User', async t => {
  t.plan(5);
  const res = await request(app)
    .post('/api/users')
    .send({ user: { firstName: 'Naruto', lastName: 'Uzumaki', studentId: '77777777', email: 'naruto@gmail.com', password: 'f34gb2bh24b24b3' } })
    .set('Accept', 'application/json');
  t.is(res.status, 200);
  t.is(res.body.user.firstName, 'Naruto');
  t.is(res.body.user.lastName, 'Uzumaki');
  t.is(res.body.user.studentId, 77777777);
  t.is(res.body.user.email, 'naruto@gmail.com');
});

// test.serial('Should correctly login the User', async t => {
//   t.plan(5);
//   const res = await request(app)
//     .post('/api/users/login')
//     .send({ email: 'rock@gmail.com', password: 'PPPPPPPp1' })
//     .set('Accept', 'application/json');
//   t.is(res.status, 200);
//   t.is(res.body.user.firstName, 'Rock');
//   t.is(res.body.user.lastName, 'Lee');
//   t.is(res.body.user.studentId, 99993333);
//   t.is(res.body.user.email, 'rock@gmail.com');
// });

test.serial('Should correctly logoff the User', async t => {
  t.plan(2);
  const res = await request(app)
    .get('/api/users/logout')
    .set('Accept', 'application/json');
  t.is(res.status, 200);
  t.is(res.body.user, null);
});

//* ************
// StudyGroups
//* ************

// test.serial('Should correctly create a new Study Group', async t => {
//   t.plan(5);
//   const res = await request(app)
//     .post('/api/studyGroups')
//     .send({ studyGroup: {groupName: 'Hanna Boys', course: 'comp346', teacher: 'Hanna Aiman', description: 'Operating Systems'}})
//     .set('Accept', 'application/json');
//   t.is(res.status, 200);
//   t.is(res.body.studyGroup.groupName, 'Hanna Boys');
//   t.is(res.body.studyGroup.course, 'comp346');
//   t.is(res.body.studyGroup.teacher, 'Hanna Aiman');
//   t.is(res.body.studyGroup.description, 'Operating Systems');
// });

//* ************
// Messages
//* ************
// test.serial('Should save a message to the database', async t => {
//   t.plan(4);
//
//   const response = await request(app)
//     .post('/api/message')
//     .send({ message: {
//       messageContent: 'content of message',
//       author: 'Bob',
//       studyGroup: 'Study Group 321' },
//     })
//     .set('Accept', 'application/json');
//
//   t.is(response.status, 200);
//   t.is(response.body.message.messageContent, 'content of message');
//   t.is(response.body.message.author, 'Bob');
//   t.is(response.body.message.studyGroup, 'Study Group 321');
// });

