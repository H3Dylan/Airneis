const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db');
const app = express();
const PORT = 5050;

app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});