"use client";

import { useState } from "react";
import { speak } from "./utils/speech";

export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  // const [queue, setQueue] = useState<string[]>([]);
  const [text, setText] = useState("");

  function enqueue(text: string) {
    speak(text);
    setHistory((history) => [text, ...history]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    enqueue(text);
    setText("");
  }

  return (
    <main className="md:grid md:grid-cols-[1fr_384px] min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 p-8 md:p-24 w-full">
        <h1 className="text-3xl text-white mb-8">What do you want to say?</h1>

        <form className="w-full text-center" onSubmit={handleSubmit}>
          <input
            autoFocus
            aria-label="What do you want to say?"
            className="border border-gray-700 focus:outline-none rounded-lg px-4 py-2 text-xl max-w-[800px] w-full bg-gray-800 text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </div>

      <div className="md:border-l border-gray-800 py-8 md:py-12 px-8">
        <h2 className="md:mt-8 text-2xl text-white mb-8">History</h2>

        {history.length ? (
          <ul className="space-y-4">
            {history.map((item, i) => (
              <li key={i}>
                <div className="text-gray-200 rounded-lg border border-gray-800 py-3 px-4">
                  <p className="line-clamp-3">{item}</p>

                  <div className="flex justify-end">
                    <button
                      className="text-sm text-blue-500 hover:underline"
                      onClick={() => speak(item)}
                    >
                      Replay
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">
            Looks like you haven&rsquo;t said anything yet. Type a sentence to
            start talking!
          </p>
        )}
      </div>
    </main>
  );
}
