import './config/env.js'; // Import environment variables
import express from 'express'; // Import Express.js
import router from './routes/data.js'; // Import data routes

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/data/', router); // Mount data routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Start server
});
