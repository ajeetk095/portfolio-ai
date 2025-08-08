export default function Footer() {
  return (
    <footer className="mt-24 py-10 text-sm text-center opacity-70">
      <p>© {new Date().getFullYear()} Ajeet • Built with Next.js, Supabase, and WebLLM.</p>
      <p>
        <a
          className="underline"
          href="https://www.linkedin.com/in/ajeek095/"
          target="_blank"
          rel="noreferrer"
        >
          Connect on LinkedIn
        </a>
      </p>
    </footer>
  );
}
