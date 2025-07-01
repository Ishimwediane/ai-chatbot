'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([
    { role: 'assistant', content: 'Hi there! I am your AI assistant.' }
  ]);

  const handlesend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    const updatedMessages = [...message, newMessage];

    setMessage(updatedMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessage(prev => [...prev, data.reply]);
      }
    } catch (err) {
      console.log('chat error:', err);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl mb-4 font-bold">AI Chatbot UI</h1>

      <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-3">
        {message.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md ${
              msg.role === 'user'
                ? 'bg-[#7FE8C9] text-right ml-auto'
                : 'bg-white text-left mr-auto'
            } max-w-xs`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md flex-1"
        />
        <button
          onClick={handlesend}
          className="rounded-md text-white bg-[#7FE8C9] py-2 px-4"
        >
          Send
        </button>
      </div>
    </main>
  );
}
