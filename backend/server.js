const express = require('express');
const app = express();
const PORT = 3000; // We'll run the backend on port 3000

// This middleware allows our server to accept JSON data in requests
app.use(express.json());

// A simple test route to make sure our server is working
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// We will add our API routes here later...

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//In-mem database for storing user data
const users = [];

//API endpoint to register a new user
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  // Save new user
  const newUser = { id: users.length + 1, email, password }; // In a real app, never store passwords in plain text!
  users.push(newUser);

  console.log('Current users:', users);

  // Respond with success
  res.status(201).json({ message: 'User registered successfully.', userID: newUser.id });
});