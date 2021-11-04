//const sendMessage = require("../controllers/sendWhatsapp.controller");

const express = require("express");
const router = express.Router();

router.post("/send", async (req, res) => {
  const data = req.body;
console.log(data)
  // separates for each element received in the request body to his array

  data.forEach(function (item) {
    let _numbers = [];
    _numbers.push(item.number);
    let numbers = _numbers[0];
    console.log(numbers);

    let proccesedNumbers = numbers.replace(/0/, "whatsapp:+972");

    //console.log(proccesedNumbers === "whatsapp:+972523926909");

    // get all links in an array
    let _links = [];
    _links.push(item.link);

    let template = item.template;
    function chooseTemplate(template) {
      if (template == "1") {
        message =
          " אתם מוזמנים לענות על סקר חדש של אייפאנל. תודה על שיתוף הפעולה! לינק לסקר: ";
      } else if (template == "2") {
        message =
          " مرحباً, استطلاع جديد من iPanel ينتظرك في الرابط:  شكراً على تعاونك!: ";
      }
      return message;
    }

    chooseTemplate(template);
    sendMessage.sendMessage(message, proccesedNumbers, _links);
  });
  res.send("Message sent");
});

module.exports = router;
