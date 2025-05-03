import './config/env.js';
import express from 'express';
import router from './routes/get.js'
const app = express()

const port = process.env.PORT || 3000;

app.use('/data/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

