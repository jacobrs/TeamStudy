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

test.serial('Should correctly logoff the User', async t => {
  t.plan(2);
  const res = await request(app)
    .get('/api/users/logout')
    .set('Accept', 'application/json');
  t.is(res.status, 200);
  t.is(res.body.user, null);
});
