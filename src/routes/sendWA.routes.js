const sendMessage = require("../twilio-whatsapp/send_sms");

const express = require("express");
const router = express.Router();

router.post("/send", async (req, res) => {
  const data = req.body;
  //console.log(req.body[0].number);
  data.forEach(function (item) {
    let _numbers = [];
    _numbers.push(item.number);
    let _links = [];
    _links.push(item.link);
    //console.log(_links);
    //console.log(_numbers);
    sendMessage.sendMessage("This is a test", _numbers, _links);
  });
  res.send("Package received");
});

module.exports = router;
