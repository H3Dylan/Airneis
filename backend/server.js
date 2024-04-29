const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5050;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});