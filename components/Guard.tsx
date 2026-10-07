import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import Nav from './Nav';
export default async function Guard({children}:{children:React.ReactNode}){if(!(await isAuthenticated())) redirect('/');return <div className="shell"><Nav/><main className="main"><header className="topbar"><div><strong>SNH Device Operations</strong><br/><small>Lokale Verwaltungsumgebung</small></div><div className="profile"><div className="avatar">LH</div><div><strong>Laurens Hasan</strong><br/><small>Administrator</small></div></div></header><section className="content">{children}</section></main></div>}
