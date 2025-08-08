import ChatBox from '@/src/components/ChatBox';

export default function ChatPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">Ask Ajeet’s AI</h1>
      <p className="opacity-80 mb-4">Ask about Ajeet’s experience, projects, and skills. Voice and text supported.</p>
      <ChatBox />
    </section>
  );
}
