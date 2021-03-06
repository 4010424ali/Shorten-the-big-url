const express = require('express');

const connectDB = require('./config/db');

// init app
const app = express();

//  Connect to database
connectDB();

app.use(express.json({ extended: false }));

// Define Route
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
