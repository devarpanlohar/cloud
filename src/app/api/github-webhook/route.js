import { NextResponse } from "next/server";
import axios from "axios";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 4) {
    return "🌙 Late Night Vibes! Still burning the midnight oil, Chief?";
  } else if (hour >= 4 && hour < 6) {
    return "🌅 Early Riser! Dawn's breaking, Chief!";
  } else if (hour >= 6 && hour < 9) {
    return "☀️ Good Morning, Chief! Rise and shine!";
  } else if (hour >= 9 && hour < 12) {
    return "🌤️ Bright Morning! Making progress, Chief?";
  } else if (hour >= 12 && hour < 15) {
    return "⛅ Good Afternoon, Chief! How's the day treating you?";
  } else if (hour >= 15 && hour < 18) {
    return "🌥️ Afternoon Glow! Staying strong, Chief!";
  } else if (hour >= 18 && hour < 21) {
    return "🌆 Good Evening, Chief! Time to unwind!";
  } else {
    return "🌃 Night Owl Hours! Still crushing it, Chief?";
  }
}

function getEllaQuote() {
  const quotes = [
    "🧠 All systems nominal, Chief.",
    "🔧 I’ve taken the liberty to tidy up the logs.",
    "📡 Awaiting further instructions, sir.",
    "🛰️ Shall I prepare the next protocol?",
    "🧪 Compiling diagnostics for your perusal.",
    "⚙️ Another step closer to world domination, Chief.",
    "📊 Your repository is in excellent health.",
    "🕹️ Let me know if you'd like a deeper analysis.",
    "🤖 Sir, I suggest reviewing this anomaly at your earliest convenience.",
    "🚨 Minor irregularity detected—but nothing I can’t handle.",
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
}

export async function POST(req) {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const event = req.headers.get("x-github-event");
  const payload = await req.json();

  let message = `${getGreeting()}\n\n🧠 <b>Status Update from your ELLA Bot</b>\n\n`;
  message += `🗂️ <b>GitHub Event:</b> ${event}\n\n`;

  try {
    switch (event) {
      case "push":
        message += `🏷️ <b>Repository:</b> ${payload.repository.full_name}\n`;
        message += `👤 <b>Author:</b> ${payload.head_commit.author.name}\n`;
        message += `🌿 <b>Branch:</b> ${payload.ref.split("/").pop()}\n`;
        message += `📌 <b>Commit:</b> ${payload.head_commit.message.split("\n")[0].slice(0, 60)}\n`;
        message += `🔗 <a href="${payload.head_commit.url}">View Commit</a>\n`;
        break;

      case "issues":
        message += `📑 <b>Issue #${payload.issue.number}:</b> ${payload.action}\n`;
        message += `✍️ <b>Title:</b> ${payload.issue.title}\n`;
        message += `👤 <b>By:</b> ${payload.sender.login}\n`;
        message += `🔗 <a href="${payload.issue.html_url}">View Issue</a>\n`;
        message += `\n⚠️ Recommendation: You might want to look at this, sir.`;
        break;

      case "fork":
        message += `🍴 <b>New Fork Created</b>\n`;
        message += `👤 <b>Forked by:</b> ${payload.sender.login}\n`;
        message += `🏷️ <b>Original:</b> ${payload.repository.full_name}\n`;
        message += `🆕 <b>New Fork:</b> ${payload.forkee.full_name}\n`;
        message += `🔗 <a href="${payload.forkee.html_url}">View Fork</a>\n`;
        break;

      case "pull_request":
        message += `🔄 <b>Pull Request #${payload.pull_request.number}:</b> ${payload.action}\n`;
        message += `✍️ <b>Title:</b> ${payload.pull_request.title}\n`;
        message += `👤 <b>By:</b> ${payload.sender.login}\n`;
        message += `🌿 <b>Branch:</b> ${payload.pull_request.head.ref} → ${payload.pull_request.base.ref}\n`;
        message += `🔗 <a href="${payload.pull_request.html_url}">View PR</a>\n`;
        break;

      case "deployment":
        message += `🚀 <b>New Deployment Triggered</b>\n`;
        message += `🏷️ <b>Environment:</b> ${payload.deployment.environment}\n`;
        message += `👤 <b>By:</b> ${payload.deployment.creator.login}\n`;
        message += `🔗 <a href="${payload.repository.html_url}/commit/${payload.deployment.sha}">View Commit</a>\n`;
        message += `\n🧪 Initiating post-deployment diagnostics...`;
        break;

      case "deployment_status":
        message += `🔄 <b>Deployment Status Update</b>\n`;
        message += `🏷️ <b>Environment:</b> ${payload.deployment.environment}\n`;
        message += `📊 <b>Status:</b> ${payload.deployment_status.state}\n`;
        message += `📝 <b>Description:</b> ${payload.deployment_status.description || "No description"}\n`;
        message += `\n🔧 Monitoring status, Chief.`;
        break;

      default:
        message += `ℹ️ Unhandled event type: ${event}\n`;
        message += `🔍 Please check the payload for more insights, sir.`;
    }

    // Classy footer
    message += `\n\n💬 <i>${getEllaQuote()}</i>`;
    message += `\n\n🏠 <b>Repository:</b> <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>`;
    message += `\n\n🕹️ <i>ELLA at your service.</i>`;

    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: "ok" });
}
