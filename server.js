//Dependencies and modules
const express = require("express");
const cors = require("cors");
const path = require("path");
//Tells node that we are creating an express server
const app = express();
//Calls mongoose an odm for MongoDB
const mongoose = require("mongoose");
//Sets an initial PORT that will listen for requests from the client side
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

//Middlewares = function that will be executed in between request and responses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true }));

//Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Api routes will go here
app.use(routes);

//Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const { MONGO_DB_URL } = process.env;
//Api routes needs to be defined before this runs
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Mongodb connected and Server is running at ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error.");
  });

//Starts the server and syncing models
