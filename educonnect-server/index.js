const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI, {
  family: 4
});

app.get('/', (req, res) => {
  res.send('EduConnect Server is running!');
});

// JWT route
app.post('/jwt', (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET || 'educonnect-secret', { expiresIn: '7d' });
  res.json({ success: true, token });
});

// Logout route
app.get('/logout', (req, res) => {
  res.json({ success: true });
});

// All approved classes
app.get('/allClasses', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const classes = await db.collection('classes').find({ status: 'approved' }).toArray();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Single class by ID
app.get('/class/:id', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const classItem = await db.collection('classes').findOne({ _id: new ObjectId(req.params.id) });
    if (!classItem) return res.status(404).json({ message: 'Class not found' });
    res.json(classItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All teachers
app.get('/all-teacher', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const teachers = await db.collection('teachers').find().toArray();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Users stat
app.get('/users-stat', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const users = await db.collection('teachers').find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Feedback
app.get('/feedback', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const feedbacks = await db.collection('feedback').find().toArray();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---- ADDED: Check if user is admin ----
app.get('/users/admin/:email', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const user = await db.collection('users').findOne({ email: req.params.email });
    res.json({ admin: user?.role === 'admin' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---- ADDED: Check if user is teacher ----
app.get('/teacher-req/teacher/:email', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const teacher = await db.collection('teachers').findOne({ email: req.params.email });
    res.json({ teacher: !!teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---- ADDED: Add a new class ----
app.post('/addClass', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const result = await db.collection('classes').insertOne({ ...req.body, status: 'pending' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Connect to MongoDB then start server
async function run() {
  try {
    await client.connect();
    console.log('MongoDB Connected!');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
// My classes by teacher email
app.get('/my-classes/:email', async (req, res) => {
  try {
    const db = client.db('educonnect');
    const classes = await db.collection('classes').find({ email: req.params.email }).toArray();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get user profile by JWT token
// Get user profile by JWT token
app.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'educonnect-secret');
    const db = client.db('educonnect');
    let user = await db.collection('teachers').findOne({ email: decoded.email });
    if (!user) {
      user = await db.collection('users').findOne({ email: decoded.email });
    }
    if (!user) {
      return res.json({ email: decoded.email, name: 'User' });
    }
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});
run();
