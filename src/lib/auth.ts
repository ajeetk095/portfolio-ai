import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function getSession() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return session;
}

export function isAdmin(email?: string | null) {
  const allowed = (process.env.ALLOWED_ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase());
  return email ? allowed.includes(email.toLowerCase()) : false;
}
