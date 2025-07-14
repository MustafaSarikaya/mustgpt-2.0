import { openai } from "@/src/app/openai";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

type ActionRequest = {
  runId: string;
  toolCallOutputs: Array<{
    tool_call_id: string;
    output: string;
  }>;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  const { runId, toolCallOutputs } = (await request.json()) as ActionRequest;

  const run = await openai.beta.threads.runs.submitToolOutputs(
    params.threadId,
    runId,
    {
      tool_outputs: toolCallOutputs.map(output => ({
        tool_call_id: output.tool_call_id,
        output: output.output
      }))
    }
  );

  const stream = openai.beta.threads.runs.stream(params.threadId, run);
  return new Response(stream.toReadableStream());
}
