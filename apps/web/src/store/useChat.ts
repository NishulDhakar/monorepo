import { create } from "zustand";
import { aiService } from "../lib/aiApi";
import { persist } from "zustand/middleware";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  sendMessage: (question: string) => Promise<void>;
}

export const useChat = create<ChatState>()(persist((set, get) => ({
  messages: [],

  sendMessage: async (question) => {
    const currentMessages = get().messages;

    set({
      messages: [...currentMessages, { role: "user", content: question }],
    });

    const res = await aiService.post("/chat", {
      question,
      history: currentMessages,
    });

    const answer = res.data.answer;

    set({
      messages: [
        ...get().messages,
        { role: "assistant", content: answer },
      ],
    });
  },
}),
{
    name: "chat-storage",
}));