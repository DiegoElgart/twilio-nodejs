// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken, { lazyLoading: true });

const sendMessage = async (message, senderID, link) => {
  try {
    await client.messages.create({
      to: "whatsapp:" + senderID,
      body: message + link,
      from: "whatsapp:+14155238886",
    });
  } catch (error) {
    console.log(`Error at sendMessage -->${error}`);
  }
};
module.exports = {
  sendMessage,
};
