import { assistantId } from "@/src/app/assistant-config";
import { openai } from "@/src/app/openai";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

type MessageRequest = {
  content: string;
};

// Send a new message to a thread
export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  const { content } = (await request.json()) as MessageRequest;

  await openai.beta.threads.messages.create(params.threadId, {
    role: "user",
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(params.threadId, {
    assistant_id: assistantId,
  });

  return new Response(stream.toReadableStream());
}
