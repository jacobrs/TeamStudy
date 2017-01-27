import User from './models/user';

export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const user1 = new User({
      firstName: 'Jacob',
      lastName: 'Gagne',
      email: 'gagne.jacob@gmail.com',
      cuid: 'cikqgkv4q01ck7453ualdn3hd',
      studentId: 40002704,
      dateAdded: Date.now()
    });

    User.create([user1], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
