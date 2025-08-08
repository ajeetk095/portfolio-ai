'use client';

import { supabase } from '@/src/lib/supabaseClient';
import { useEffect, useState } from 'react';
import FileUploader from '@/src/components/FileUploader';

function Section({ title, children }: any) {
  return (
    <div className="glass p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function refreshSession() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  }

  useEffect(() => {
    refreshSession();
    const { data: listener } = supabase.auth.onAuthStateChange(() => refreshSession());
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signUp() {
    await supabase.auth.signUp({ email, password });
  }
  async function signIn() {
    await supabase.auth.signInWithPassword({ email, password });
  }
  async function reset() {
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/admin' });
    alert('Password reset email sent if account exists.');
  }
  async function signOut() {
    await supabase.auth.signOut();
  }

  const isAdmin = (() => {
    const allowed = (process.env.NEXT_PUBLIC_ALLOWED || process.env.ALLOWED_ADMIN_EMAILS || '')
      .split(',')
      .map((x) => x.trim().toLowerCase());
    return session?.user?.email && allowed.includes(session.user.email.toLowerCase());
  })();

  if (!session) {
    return (
      <div className="max-w-md mx-auto glass p-4 rounded space-y-2">
        <h1 className="text-xl font-semibold">Admin Login / Signup</h1>
        <input className="w-full px-3 py-2 rounded border" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 rounded border" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={signIn} className="px-3 py-1 rounded bg-primary text-white">Login</button>
          <button onClick={signUp} className="px-3 py-1 rounded border">Signup</button>
          <button onClick={reset} className="px-3 py-1 rounded border">Forgot Password</button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="glass p-4 rounded">
        <p>Logged in as {session.user.email}. You are not authorized as admin.</p>
        <button onClick={signOut} className="mt-2 px-3 py-1 rounded border">Logout</button>
      </div>
    );
  }

  async function saveBlock(key: string) {
    const el = document.getElementById(`block-${key}`) as HTMLTextAreaElement;
    const markdown = el.value;
    await fetch('/api/upload', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ contentBlock: { key, markdown }}) });
    alert('Saved');
  }

  async function triggerSync() {
    const res = await fetch('/api/sync?secret=' + encodeURIComponent(process.env.SYNC_CRON_SECRET || ''), { method: 'POST' });
    alert(res.ok ? 'Sync triggered' : 'Sync failed');
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between glass p-4 rounded">
        <div>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm opacity-70">Welcome, {session.user.email}</p>
        </div>
        <button onClick={signOut} className="px-3 py-1 rounded border">Logout</button>
      </div>

      <Section title="Intro / About">
        <label className="block text-sm">About markdown</label>
        <textarea id="block-about" className="w-full min-h-[120px] px-3 py-2 rounded border" placeholder="Write your about..."></textarea>
        <button onClick={()=>saveBlock('about')} className="mt-2 px-3 py-1 rounded bg-primary text-white">Save</button>
      </Section>

      <Section title="Upload files">
        <div className="grid md:grid-cols-2 gap-3">
          <FileUploader page="resume" />
          <FileUploader page="courses" />
          <FileUploader page="projects" />
          <FileUploader page="misc" />
        </div>
      </Section>

      <Section title="Sync from Google Sheet JSON (LinkedIn-friendly workflow)">
        <p className="text-sm opacity-80">
          Paste your exported LinkedIn data into a Google Sheet and publish JSON. This keeps weekly auto-sync free and ToS-safe.
        </p>
        <button onClick={triggerSync} className="mt-2 px-3 py-1 rounded border">Run sync now</button>
      </Section>

      <Section title="Deploy helper (GitHub Pages)">
        <p className="text-sm opacity-80">
          When you add project repos, use GitHub Pages (free) for static demos. Add the demo URL in your project entry.
        </p>
      </Section>
    </div>
  );
}
