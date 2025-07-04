require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5175', 'https://vet-app-snowy.vercel.app'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
};


const Pet = require('./models/Pet');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors(corsOptions));
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

app.delete('/pets/:id', async (req, res) => {

    console.log("Attempting to delete ID:", req.params.id); 
    try {

    
        const deleted = await Pet.findByIdAndDelete(req.params.id);

        if(!deleted){
            return res.status(404).json({message: "Pet not found"})
        }
        
        
        res.json({message: "Pet deleted"})
    }
    
    catch(err){
        res.status(500).json({message: err.message});
    }

    
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
