const sendMessage = require("../twilio-whatsapp/send_sms");

const express = require("express");
const router = express.Router();

router.post("/send", async (req, res) => {
  const data = req.body;
  const numbers = data.numbers;

  numbers.map(number => {
    number.replace(/0/, "whatsapp:+972");

    const links = data.links.map(link => link);
  });

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
  sendMessage.sendMessage(message, numbers, link);
});

module.exports = router;
