import { env } from "@/src/env";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { Run } from "openai/resources/beta/threads/runs";
import type { ThreadCreateParams } from "openai/resources/beta/threads/threads";
import type { MessageCreateParams } from "openai/resources/beta/threads/messages/messages";
import type { RunCreateParams, RunRetrieveParams } from "openai/resources/beta/threads/runs/runs";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    const message = body.message as string;
    if (!message) {
      throw new Error("Message is required");
    }

    // Create a new thread
    const threadParams: ThreadCreateParams = {};
    const thread = await openai.beta.threads.create(threadParams);
    if (!thread?.id) {
      throw new Error("Failed to create thread");
    }

    // Add the user's message to the thread
    const messageParams: MessageCreateParams = {
      role: "user",
      content: message,
    };
    const threadMessage = await openai.beta.threads.messages.create(thread.id, messageParams);
    if (!threadMessage) {
      throw new Error("Failed to create message");
    }

    // Run the assistant
    const runParams: RunCreateParams = {
      assistant_id: env.OPENAI_ASSISTANT_ID,
    };
    const run = await openai.beta.threads.runs.create(thread.id, runParams);
    if (!run?.id) {
      throw new Error("Failed to create run");
    }

    // Create a stream to send the response
    const retrieveParams: RunRetrieveParams = {
      thread_id: thread.id,
    };
    const runResponse = await openai.beta.threads.runs.retrieve(thread.id, retrieveParams);
    if (!runResponse) {
      throw new Error("Failed to retrieve run");
    }

    const stream = OpenAIStream(runResponse);
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Log error details but return a generic message
    console.error("[CHAT_ERROR]", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
