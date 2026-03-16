const twilio = require('twilio');

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsApp = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // sandbox twilio
      to: `whatsapp:${to}`
    });

    console.log("Mensaje enviado");
  } catch (error) {
    console.error("Error WhatsApp:", error.message);
  }
};

module.exports = { sendWhatsApp };