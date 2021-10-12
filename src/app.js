const users = require("./routes/user.routes");
const auth = require("./routes/auth.routes");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").Server(app);
const cors = require("cors");

//require("dotenv").config();
const dbURI =
  "mongodb+srv://ipanel_diego:cordoba12@ipaneltwilio.e2xn2.mongodb.net/Ipanel-twilio?retryWrites=true&w=majority";

//Connection to MongoDB(Atlas)
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB..."));

//Set up app
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

//Server
const port = 4000;
http.listen(port, () => console.log(`Listening on port ${port}...`));
