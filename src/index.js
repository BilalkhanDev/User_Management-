const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require("cors"); 
const connectDB=require('./config/db')
const bodyparser = require("body-parser");
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

// Middleware to parse JSON bodies
app.use(express.json());


app.use(express.json({ limit: "10mb" }));
app.use("/api", require("./routes/index"));
// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
