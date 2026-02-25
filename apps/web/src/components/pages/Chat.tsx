import { useState } from "react";
import { useChat } from "../../store/useChat";
import Navbar from "../layout/Navbar";

export default function Chat() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-6 max-w-3xl w-full mx-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${msg.role === "user"
                ? "ml-auto bg-gray-200 text-black"
                : "bg-white shadow-sm"
              }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-gray-200 p-4 mt-auto">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-black bottom-0 text-white px-5 rounded-md hover:opacity-90 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}