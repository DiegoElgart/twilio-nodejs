const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const App = express();

//connect to MongoDb
const dbURI =
  "mongodb+srv://ipanel_diego:cordoba12@ipaneltwilio.e2xn2.mongodb.net/Ipanel-twilio?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

App.use(express.urlencoded({ extended: true }));
App.use(express.json());

const PORT = process.env.PORT;

//Home route
App.get("/", (req, res) => {
  res.send("Welcome!!");
});
const WA = require("./helper/send_sms");

//Route for WhatsApp
App.post("/whatsapp", async (req, res) => {
  let message = req.body.Body;
  let senderID = req.body.From;

  console.log(message);
  console.log(senderID);

  // Write a function to send message back to WhatsApp
  await WA.sendMessage("Hello from the other side", senderID);
});

//Start server
App.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
