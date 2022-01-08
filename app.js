//Require
const express = require("express");
const works = require("./routes/works.routes");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cors = require("cors");

// middleware
app.use(express.static("public"));
app.use(cors());

// routes
app.use("/api/v1/works", works);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5001;

// Connect to db and start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
