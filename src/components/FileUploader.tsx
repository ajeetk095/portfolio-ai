'use client';

import { useState } from 'react';
import { supabase } from '@/src/lib/supabaseClient';

export default function FileUploader({ page }: { page: string }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      setMessage(null);
      const file = e.target.files?.[0];
      if (!file) return;
      const path = `${page}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from('uploads').upload(path, file);
      if (error) throw error;

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ name: file.name, path, mime: file.type, page }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('DB insert failed');

      setMessage('Uploaded!');
      e.currentTarget.value = '';
    } catch (err: any) {
      setMessage(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-4 rounded glass">
      <label className="block text-sm mb-2">Upload file for: {page}</label>
      <input type="file" onChange={onChange} disabled={uploading} />
      {message && <div className="text-xs mt-2">{message}</div>}
    </div>
  );
}
