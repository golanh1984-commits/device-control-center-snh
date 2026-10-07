import { redirect } from 'next/navigation';
import { hasSession } from '@/lib/auth';
import Nav from './Nav';

export default async function Guard({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await hasSession();

  if (!authenticated) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-[#061018] text-white">
      <Nav />
      <main>{children}</main>
    </div>
  );
}