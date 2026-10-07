'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Smartphone, MapPin, Map, Bell, Users, ClipboardList, ShieldCheck, FileText, Settings } from 'lucide-react';
const items=[['/dashboard','Übersicht',LayoutDashboard],['/devices','Geräte',Smartphone],['/location','Standortabfrage',MapPin],['/map','Karte',Map],['/actions','Geräteaktionen',Bell],['/users','Benutzer',Users],['/audit','Verlauf',ClipboardList],['/security','Sicherheit',ShieldCheck],['/reports','Berichte',FileText],['/settings','Einstellungen',Settings]] as const;
export default function Nav(){const path=usePathname();return <aside className="sidebar"><div className="brand"><div className="brand-title">Device Control Center SNH</div><div className="brand-sub">Interne Geräteverwaltung</div></div><nav className="nav">{items.map(([href,label,Icon])=><Link className={path===href?'active':''} href={href} key={href}><Icon size={16}/>{label}</Link>)}</nav></aside>}
