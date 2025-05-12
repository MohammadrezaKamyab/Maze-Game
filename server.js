const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/maze', { useNewUrlParser: true, useUnifiedTopology: true });

const MovementSchema = new mongoose.Schema({
  username: String,
  direction: String,
  x: Number,
  y: Number,
  timestamp: { type: Date, default: Date.now }
});
const Movement = mongoose.model('Movement', MovementSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/move', async (req, res) => {
  const { username, direction, x, y } = req.body;
  await Movement.create({ username, direction, x, y });
  res.json({ status: 'ok' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));