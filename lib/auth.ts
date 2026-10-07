import { cookies } from 'next/headers';

const SESSION_NAME = 'snh_session';

export async function setSession() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_NAME, 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export async function hasSession() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_NAME)?.value === 'authenticated';
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);
}