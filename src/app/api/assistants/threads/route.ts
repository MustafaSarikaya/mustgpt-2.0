import { openai } from "@/src/app/openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Create a new thread
export async function POST() {
  const thread = await openai.beta.threads.create();
  return NextResponse.json({ threadId: thread.id });
}
