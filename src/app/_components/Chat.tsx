"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Stack, Textarea, Text } from "@mantine/core";
import { AssistantStream } from "openai/lib/AssistantStream";

import { AssistantStreamEvent } from "openai/resources/beta/assistants/assistants";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";


type ChatProps = {
  functionCallHandler?: (
    toolCall: RequiredActionFunctionToolCall
  ) => Promise<string>;
};

type Message = {
  role: "user" | "assistant";
  text: string;
};

type ThreadResponse = {
  threadId: string;
};

const Chat = ({
  functionCallHandler = () => Promise.resolve(""),
}: ChatProps) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");

  // Automatically scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create a new threadID when chat component created
  useEffect(() => {
    const createThread = async () => {
      try {
        const res = await fetch(`/api/assistants/threads`, {
          method: "POST",
        });
        const data = (await res.json()) as ThreadResponse;
        setThreadId(data.threadId);
      } catch (error) {
        console.error("Error creating thread:", error);
      }
    };
    void createThread();
  }, []);

  const sendMessage = async (text: string) => {
    try {
      const response = await fetch(
        `/api/assistants/threads/${threadId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: text,
          }),
        }
      );
      if (!response.body) throw new Error("No response body");
      const stream = AssistantStream.fromReadableStream(response.body);
      handleReadableStream(stream);
    } catch (error) {
      console.error("Error sending message:", error);
      setInputDisabled(false);
    }
  };

  const submitActionResult = async (runId: string, toolCallOutputs: Array<{ tool_call_id: string; output: string }>) => {
    try {
      const response = await fetch(
        `/api/assistants/threads/${threadId}/actions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            runId,
            toolCallOutputs,
          }),
        }
      );
      if (!response.body) throw new Error("No response body");
      const stream = AssistantStream.fromReadableStream(response.body);
      handleReadableStream(stream);
    } catch (error) {
      console.error("Error submitting action result:", error);
      setInputDisabled(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    void sendMessage(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userInput },
    ]);
    setUserInput("");
    setInputDisabled(true);
    scrollToBottom();
  };

  // Re-enable the input form when run is completed
  const handleRunCompleted = () => {
    setInputDisabled(false);
  };

  /* Stream Event Handlers */

  // textCreated - create new assistant message
  const handleTextCreated = () => {
    appendMessage("assistant", "");
  };

  // textDelta - append text to last assistant message
  const handleTextDelta = (delta) => {
    if (delta.value != null) {
      appendToLastMessage(delta.value);
    };
    if (delta.annotations != null) {
      annotateLastMessage(delta.annotations);
    }
  };


  // handleRequiresAction - handle function call
  const handleRequiresAction = async (
    event: AssistantStreamEvent.ThreadRunRequiresAction
  ) => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    // loop over tool calls and call function handler
    const toolCallOutputs = await Promise.all(
      toolCalls.map(async (toolCall) => {
        const result = await functionCallHandler(toolCall);
        return { output: result, tool_call_id: toolCall.id };
      })
    );
    setInputDisabled(true);
    submitActionResult(runId, toolCallOutputs);
  };

  const handleReadableStream = (stream: AssistantStream) => {
    // messages
    stream.on("textCreated", handleTextCreated);
    stream.on("textDelta", handleTextDelta);

    // events without helpers yet (e.g. requires_action and run.done)
    stream.on("event", (event) => {
      if (event.event === "thread.run.requires_action") {
        void handleRequiresAction(event);
      }
      if (event.event === "thread.run.completed") handleRunCompleted();
    });
  };

  // Utility helpers

  const appendToLastMessage = (text) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  const appendMessage = (role, text) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  const annotateLastMessage = (annotations) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
      };
      annotations.forEach((annotation) => {
        if (annotation.type === 'file_path') {
          updatedLastMessage.text = updatedLastMessage.text.replaceAll(
            annotation.text,
            `/api/files/${annotation.file_path.file_id}`
          );
        }
      })
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
    
  }

  return (
    <Box w="100%" h="100vh" p="md">
      <Stack h="100%" gap="md">
        <Box
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid var(--mantine-color-gray-3)",
            borderRadius: "var(--mantine-radius-md)",
            padding: "var(--mantine-spacing-md)",
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              mb="md"
              p="sm"
              style={{
                backgroundColor:
                  msg.role === "user"
                    ? "var(--mantine-color-blue-0)"
                    : "var(--mantine-color-gray-0)",
                borderRadius: "var(--mantine-radius-sm)",
              }}
            >
              <Text size="sm" fw={500} c={msg.role === "user" ? "blue" : "dark"}>
                {msg.role === "user" ? "You" : "Assistant"}
              </Text>
              <Text mt={4}>{msg.text}</Text>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <form onSubmit={handleSubmit}>
          <Stack gap="sm">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your question"
              minRows={2}
              maxRows={4}
              disabled={inputDisabled}
            />
            <Button type="submit" disabled={inputDisabled}>
              Send
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default Chat;
