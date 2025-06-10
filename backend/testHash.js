/**
 * Directory: backend/
 * Description: Test bcrypt hash for student123 against database.
 */
const bcrypt = require('bcryptjs');

const password = 'student123';
const dbHash = '$2b$10$5t5sUCysgVjFjmORsh6DruJHYGukgcW9l5PZE3QpJsJyRI8sB1TEq.'; // Replace with hash from MongoDB
bcrypt.compare(password, dbHash).then(isMatch => {
    console.log('Password match:', isMatch); // Should print true
}).catch(err => console.error('Error:', err));