import { useState } from "react";
import { useChat } from "../../store/useChat";


export default function Chat() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="p-4">
      <div className="space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4">
          Send
        </button>
      </div>
    </div>
  );
}