'use client';

import { useEffect, useRef, useState } from 'react';
import { extractPageContext, AI_MODEL } from '@/src/lib/ai';

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
  }
}

export default function ChatBox() {
  const [ready, setReady] = useState(false);
  const [model, setModel] = useState<any>(null);
  const [msgs, setMsgs] = useState<{ role: 'user'|'assistant', content: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    // Dynamically load WebLLM
    (async () => {
      try {
        // @ts-ignore
        const mod = await import('https://esm.run/@mlc-ai/web-llm');
        const engine = await mod.CreateMLCEngine(AI_MODEL, {
          initProgressCallback: () => {}
        });
        setModel(engine);
        setReady(true);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  function speak(text: string) {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(u);
    }
  }

  function startListening() {
    const Rec = window.webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!Rec) return;
    const rec = new Rec();
    rec.lang = 'en-IN';
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      inputRef.current!.value = t;
    };
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  }

  async function ask(q: string) {
    const context = extractPageContext().slice(0, 6000);
    setMsgs((m) => [...m, { role: 'user', content: q }]);
    const prompt = `You are Ajeet's AI portfolio assistant. Answer strictly based on CONTEXT. If unknown, say you don't know.\nCONTEXT:\n${context}\n\nUser: ${q}\nAnswer:`;
    const reply = await model.chat.completions.create({
      stream: false,
      messages: [{ role: 'user', content: prompt }]
    });
    const text = reply.choices[0].message.content;
    setMsgs((m) => [...m, { role: 'assistant', content: text }]);
    speak(text);
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-[90vw]">
      <details className="glass rounded-lg overflow-hidden" open>
        <summary className="cursor-pointer px-3 py-2 flex items-center justify-between">
          <span>🤖 Ask Ajeet’s AI</span>
          <span className="text-xs">{ready ? 'ready' : 'loading...'}</span>
        </summary>
        <div className="p-3 space-y-2 max-h-[60vh] overflow-auto">
          {msgs.map((m, i) => (
            <div key={i} className={`text-sm ${m.role === 'assistant' ? 'opacity-90' : 'font-medium'}`}>
              <b>{m.role === 'assistant' ? 'AI' : 'You'}: </b>{m.content}
            </div>
          ))}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              className="flex-1 px-2 py-1 rounded border"
              placeholder="Ask about Ajeet..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') ask((e.target as HTMLInputElement).value);
              }}
            />
            <button
              className="px-3 py-1 rounded bg-primary text-white disabled:opacity-50"
              onClick={() => ask(inputRef.current?.value || '')}
              disabled={!ready}
            >
              Send
            </button>
            <button className="px-3 py-1 rounded border" onClick={startListening}>
              🎙️
            </button>
          </div>
        </div>
      </details>
    </div>
  );
}
