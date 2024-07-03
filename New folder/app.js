require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

app.get('/', (req,res) => {
    res.send("test")
})


mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to DB and Listening at http://localhost:${process.env.PORT}/`)
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

