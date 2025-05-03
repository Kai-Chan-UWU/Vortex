import express from 'express';
import dotenv from 'dotenv';
import router from './routes/get.js'
const app = express()

dotenv.config();

const port = process.env.PORT || 3000;

app.use('/data/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

