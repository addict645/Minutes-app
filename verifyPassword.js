import bcrypt from 'bcrypt';

// Function to verify password
async function verifyPassword(plainPassword, hashedPassword) {
  try {
    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password matches:', isMatch);
  } catch (error) {
    console.error('Error verifying password:', error);
  }
}

// Password provided in the curl command
const plainPassword = 'Theeaddict@407';

// Hashed password retrieved from the database
const hashedPassword = '$2b$10$XYjYa/7H0H1wPpOJAoIR.uugUVghl9KrHRacyFwBrx1n7HMarfx5i';

// Verify the password
verifyPassword(plainPassword, hashedPassword);
