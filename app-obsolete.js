const { App } = require('@slack/bolt');
const cron = require('node-cron');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: false,
  port: process.env.PORT || 3000
});

const USER_ID = process.env.USER_ID;

cron.schedule('0 10 * * 5', async () => {
  await app.client.chat.postMessage({
    channel: USER_ID,
    text: 'Happy Friday! Who are 3 people you worked with this week? (one per line)'
  });
});

app.message(async ({ message, say }) => {
  if (message.subtype === 'bot_message' || !message.text) return;
  const names = message.text.split('\n').map(n => n.trim()).filter(Boolean);
  if (names.length !== 3) {
    await say('Please enter exactly 3 names, one per line.');
    return;
  }
  const selected = names[Math.floor(Math.random() * names.length)];
  await say(`Great! Why not leave feedback for *${selected}*?\n👉 https://mono-1.my.canva.site/feedback/#comment-boxes`);
});

(async () => {
  await app.start();
  console.log('⚡️ Friday Feedback Bot is running');
})();
