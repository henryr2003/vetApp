require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pet = require('./models/Pet');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/pets', async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

app.post('/pets', async (req, res) => {
  const pet = new Pet(req.body);
  await pet.save();
  res.json(pet);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
