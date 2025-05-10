const axios = require("axios");

module.exports = async (req, res) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const { payload } = req.body;

  const message =
    `🚀 Vercel Deployment\n` +
    `Project: ${payload.name}\n` +
    `Status: ${payload.readyState}\n` +
    `URL: ${payload.url}`;

  await axios.post(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }
  );

  res.status(200).send("OK");
};
