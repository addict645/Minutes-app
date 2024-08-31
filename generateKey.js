// generateKey.js
const crypto = require('crypto');

const key = crypto.randomBytes(64).toString('hex');
console.log('Generated SECRET_KEY:', key);
