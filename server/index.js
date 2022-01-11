const express = require('express');
const studRouter = require('./routes/students')
const gradeRouter = require('./routes/grades')
const connectDB = require('./config/database');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


app.use('/api/univer', studRouter)
app.use('/api/grades', gradeRouter)

app.listen(8000, () => console.log(`app is listening on port 8000`));
// http://localhost:8000