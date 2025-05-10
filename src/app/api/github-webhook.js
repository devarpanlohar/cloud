const axios = require("axios");

module.exports = async (req, res) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const event = req.headers["x-github-event"];
  const payload = req.body;

  let message = `📦 GitHub Event: ${event}\n`;
  if (event === "push") {
    message += `Repo: ${payload.repository.name}\n`;
    message += `Commit: ${payload.head_commit.message.slice(0, 50)}...`;
  } else if (event === "issues") {
    message += `Issue #${payload.issue.number}: ${payload.action}\n`;
    message += `Title: ${payload.issue.title}`;
  }

  await axios.post(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }
  );

  res.status(200).send("OK");
};
