const bcrypt = require('bcrypt');

const password = 'Theeaddict@407'; // The password you want to hash
const saltRounds = 10; // Number of salt rounds

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('Hashed Password:', hash);
});
