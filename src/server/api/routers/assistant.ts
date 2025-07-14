import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { openai } from "@/src/app/openai";
import { assistantId } from "@/src/app/assistant-config";
import { TRPCError } from "@trpc/server";

export const assistantRouter = createTRPCRouter({
  createThread: publicProcedure
    .mutation(async () => {
      const thread = await openai.beta.threads.create();
      return { threadId: thread.id };
    }),

  sendMessage: publicProcedure
    .input(z.object({
      threadId: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ input }) => {
      await openai.beta.threads.messages.create(input.threadId, {
        role: "user",
        content: input.content,
      });

      const stream = openai.beta.threads.runs.stream(input.threadId, {
        assistant_id: assistantId,
      });

      return stream.toReadableStream();
    }),

  submitToolOutputs: publicProcedure
    .input(z.object({
      threadId: z.string(),
      runId: z.string(),
      toolCallOutputs: z.array(z.object({
        tool_call_id: z.string(),
        output: z.string(),
      })),
    }))
    .mutation(async ({ input }) => {
      const run = await openai.beta.threads.runs.submitToolOutputs(
        input.threadId,
        input.runId,
        {
          tool_outputs: input.toolCallOutputs.map(output => ({
            tool_call_id: output.tool_call_id,
            output: output.output
          }))
        }
      );

      const stream = openai.beta.threads.runs.stream(input.threadId, run);
      return stream.toReadableStream();
    }),

  chat: publicProcedure
    .input(z.object({
      message: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        const thread = await openai.beta.threads.create();
        if (!thread?.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create thread",
          });
        }

        const threadMessage = await openai.beta.threads.messages.create(thread.id, {
          role: "user",
          content: input.message,
        });
        if (!threadMessage) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create message",
          });
        }

        const run = await openai.beta.threads.runs.create(thread.id, {
          assistant_id: assistantId,
        });
        if (!run?.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create run",
          });
        }

        const runResponse = await openai.beta.threads.runs.retrieve(thread.id, {
          thread_id: thread.id,
        });
        if (!runResponse) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to retrieve run",
          });
        }

        return runResponse;
      } catch (error) {
        console.error("[CHAT_ERROR]", error instanceof Error ? error.message : String(error));
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        });
      }
    }),
});
