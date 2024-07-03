const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const articleRouter = require('./routes/articleRouter');
const categoryRouter = require('./routes/categoryRouter');
const orderRouter = require('./routes/orderRouter');
const searchRouter = require('./routes/searchRouter');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5050;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/articles', articleRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/search', searchRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});