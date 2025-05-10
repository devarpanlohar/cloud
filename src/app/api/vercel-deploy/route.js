import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const { payload } = await req.json();

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

  return NextResponse.json({ status: "ok" });
}
