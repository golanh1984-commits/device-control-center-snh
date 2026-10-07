```tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Smartphone,
  MapPin,
  BatteryMedium,
  WifiOff,
  Bell,
  RefreshCw,
  ShieldCheck,
  User,
  Building2,
  Hash,
  Radio,
  Clock3,
  Navigation,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  Signal,
  Settings,
  Copy,
} from 'lucide-react';

export default function DevicePage() {
  const router = useRouter();
  const params = useParams();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const deviceId = String(params?.id ?? '');

  const device = {
    name: 'iPhone 15 Pro von Sozan Evdal',
    model: 'iPhone 15 Pro',
    manufacturer: 'Apple',
    type: 'iPhone',
    assetId: 'SNH-MOB-00147',
    serial: 'SNH-IP15P-48291',
    imei: '35 784200 921847 6',
    user: 'Sozan Evdal',
    department: 'Verwaltung',
    status: 'Offline',
    battery: 64,
    sim: 'Gesperrt / unbekannt',
    lastContact: '28.09.2026 · 21:37:33',
    address: 'Hannoversche Str. 1',
    city: '30629 Hannover-Misburg-Anderten',
    country: 'Deutschland',
    latitude: '52.3758',
    longitude: '9.8247',
    accuracy: 'ca. 18 m',
  };

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage('');
    }, 4000);
  }

  function runAction(text: string) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showMessage(text);
    }, 900);
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    showMessage('Wert wurde kopiert.');
  }

  if (deviceId !== 'iphone-sozan') {
    return (
      <main className="min-h-screen bg-[#071019] text-slate-200 flex items-center justify-center p-8">
        <div className="w-full max-w-xl rounded-2xl border border-[#203544] bg-[#0c1822] p-10 text-center">
          <XCircle className="mx-auto mb-5 text-red-400" size={44} />

          <h1 className="text-2xl font-semibold">
            Gerät nicht gefunden
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Das angeforderte Gerät ist in der lokalen Geräteverwaltung
            nicht vorhanden.
          </p>

          <button
            onClick={() => router.push('/dashboard')}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#21678f] bg-[#174e72] px-4 py-2.5 text-sm text-white hover:bg-[#1b628e]"
          >
            <ArrowLeft size={16} />
            Zurück zum Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071019] text-slate-200">
      <div className="mx-auto max-w-[1500px] p-7">

        {/* Kopfbereich */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center gap-2 rounded-lg border border-[#223544] bg-[#0d1822] px-4 py-2.5 text-sm text-slate-300 hover:border-[#345064] hover:bg-[#132331]"
          >
            <ArrowLeft size={16} />
            Dashboard
          </button>

          <div className="text-xs text-slate-600">
            Geräteverwaltung / Geräte / {device.name}
          </div>
        </div>

        {/* Hero */}
        <section className="rounded-2xl border border-[#203544] bg-gradient-to-br from-[#11222f] to-[#0a151e] p-6 shadow-2xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#28465a] bg-[#122738] text-[#73b8e7]">
                <Smartphone size={32} />
              </div>

              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[1.5px] text-[#7190a4]">
                  Gerätedetails
                </div>

                <h1 className="text-2xl font-semibold tracking-tight">
                  {device.name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {device.manufacturer} · {device.model} · {device.assetId}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#34434e] bg-[#707e8b]/10 px-3 py-1.5 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-slate-500" />
                  Offline · letzter Kontakt {device.lastContact}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                disabled={loading}
                onClick={() =>
                  runAction('Standortabfrage wurde lokal protokolliert.')
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[#293d4c] bg-[#101d28] px-3.5 py-2.5 text-sm text-slate-300 hover:bg-[#172a39] disabled:opacity-50"
              >
                <MapPin size={15} />
                Standort abfragen
              </button>

              <button
                disabled={loading}
                onClick={() =>
                  runAction(
                    'Klingeln wurde lokal simuliert. Es wurde kein echtes Gerät angesteuert.'
                  )
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[#293d4c] bg-[#101d28] px-3.5 py-2.5 text-sm text-slate-300 hover:bg-[#172a39] disabled:opacity-50"
              >
                <Bell size={15} />
                Klingeln
              </button>

              <button
                disabled={loading}
                onClick={() =>
                  runAction('Gerätestatus wurde lokal aktualisiert.')
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[#21678f] bg-[#174e72] px-3.5 py-2.5 text-sm text-white hover:bg-[#1b628e] disabled:opacity-50"
              >
                <RefreshCw size={15} />
                Status aktualisieren
              </button>
            </div>
          </div>
        </section>

        {/* Meldung */}
        {message && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#28506a] bg-[#0c2433] px-4 py-3 text-sm text-[#b9ddf3]">
            <CheckCircle2 size={17} />
            {message}
          </div>
        )}

        {/* Statuskarten */}
        <section className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl border border-[#1e3341] bg-[#0c1822] p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Status</span>
              <WifiOff size={17} className="text-[#6fa8ca]" />
            </div>

            <div className="mt-3 text-xl font-semibold">
              Offline
            </div>

            <div className="mt-1 text-[11px] text-slate-600">
              Letzter Kontakt 28.09.2026 · 21:37
            </div>
          </div>

          <div className="rounded-xl border border-[#1e3341] bg-[#0c1822] p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Batterie</span>
              <BatteryMedium size={17} className="text-[#6fa8ca]" />
            </div>

            <div className="mt-3 text-xl font-semibold">
              {device.battery}%
            </div>

            <div className="mt-1 text-[11px] text-slate-600">
              Letzter bekannter Wert
            </div>
          </div>

          <div className="rounded-xl border border-[#1e3341] bg-[#0c1822] p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>SIM</span>
              <Signal size={17} className="text-[#6fa8ca]" />
            </div>

            <div className="mt-3 text-xl font-semibold">
              Gesperrt
            </div>

            <div className="mt-1 text-[11px] text-slate-600">
              Status unbekannt
            </div>
          </div>

          <div className="rounded-xl border border-[#1e3341] bg-[#0c1822] p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Genauigkeit</span>
              <Navigation size={17} className="text-[#6fa8ca]" />
            </div>

            <div className="mt-3 text-xl font-semibold">
              {device.accuracy}
            </div>

            <div className="mt-1 text-[11px] text-slate-600">
              Letzter bekannter Standort
            </div>
          </div>
        </section>

        {/* Hauptbereich */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr]">

          {/* Linke Seite */}
          <div className="space-y-5">

            {/* Geräteinformationen */}
            <section className="overflow-hidden rounded-xl border border-[#1d323f] bg-[#0b1721]">
              <div className="flex items-center justify-between border-b border-[#1b303d] px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Smartphone size={17} className="text-[#6da9ca]" />
                  Geräteinformationen
                </div>

                <span className="text-[10px] uppercase tracking-widest text-slate-600">
                  {device.assetId}
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                  {[
                    ['Gerätename', device.name],
                    ['Gerätetyp', device.type],
                    ['Hersteller', device.manufacturer],
                    ['Modell', device.model],
                    ['Asset-ID', device.assetId],
                    ['Seriennummer', device.serial],
                    ['IMEI', device.imei],
                    ['SIM-Status', device.sim],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-[#1b303d] bg-[#0e1c27] p-3"
                    >
                      <div className="mb-1.5 text-[11px] text-slate-600">
                        {label}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        {label === 'Asset-ID' && <Hash size={13} />}

                        {label === 'SIM-Status' && <Radio size={13} />}

                        <span className="break-all">
                          {value}
                        </span>

                        {(label === 'Asset-ID' ||
                          label === 'Seriennummer' ||
                          label === 'IMEI') && (
                          <button
                            onClick={() => copyText(value)}
                            className="ml-auto text-slate-600 hover:text-slate-300"
                          >
                            <Copy size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Standort */}
            <section className="overflow-hidden rounded-xl border border-[#1d323f] bg-[#0b1721]">
              <div className="flex items-center justify-between border-b border-[#1b303d] px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin size={17} className="text-[#6da9ca]" />
                  Letzter bekannter Standort
                </div>

                <span className="text-[10px] uppercase tracking-widest text-slate-600">
                  28.09.2026 · 21:37:33
                </span>
              </div>

              <div className="relative h-[330px] overflow-hidden bg-[#10202b]">

                <div className="absolute left-[-10%] top-[48%] h-3 w-[130%] rotate-[-17deg] bg-slate-400/10" />

                <div className="absolute left-[-10%] top-[25%] h-2 w-[130%] rotate-[27deg] bg-slate-400/10" />

                <div className="absolute left-[20%] top-[18%] text-[10px] text-slate-600">
                  Misburg-Anderten
                </div>

                <div className="absolute left-[62%] top-[62%] text-[10px] text-slate-600">
                  Hannoversche Straße
                </div>

                <div className="absolute left-[18%] top-[76%] text-[10px] text-slate-600">
                  Hannover
                </div>

                <div className="absolute left-[57%] top-[49%] h-5 w-5 rounded-full border-4 border-white/90 bg-red-400 shadow-[0_0_0_9px_rgba(248,113,113,0.18)]" />

                <div className="absolute bottom-5 left-5 rounded-lg border border-[#304653] bg-[#061018]/95 px-4 py-3">
                  <div className="text-xs font-semibold">
                    {device.address}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-500">
                    {device.city} · Genauigkeit {device.accuracy}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                  <div className="rounded-lg border border-[#1b303d] bg-[#0e1c27] p-3">
                    <div className="text-[11px] text-slate-600">
                      Adresse
                    </div>

                    <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-300">
                      <MapPin size={13} />
                      {device.address}
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#1b303d] bg-[#0e1c27] p-3">
                    <div className="text-[11px] text-slate-600">
                      Ort
                    </div>

                    <div className="mt-1.5 text-xs text-slate-300">
                      {device.city}
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#1b303d] bg-[#0e1c27] p-3">
                    <div className="text-[11px] text-slate-600">
                      Koordinaten
                    </div>

                    <div className="mt-1.5 text-xs text-slate-300">
                      {device.latitude}, {device.longitude}
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#1b303d] bg-[#0e1c27] p-3">
                    <div className="text-[11px] text-slate-600">
                      Zeitpunkt
                    </div>

                    <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-300">
                      <Clock3 size={13} />
                      {device.lastContact}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 rounded-lg border border-[#574c2d] bg-[#211e13] p-3 text-xs leading-5 text-[#c8b77e]">
                  <AlertTriangle size={17} className="mt-0.5 shrink-0" />

                  <div>
                    <strong>Hinweis zum Standort</strong>
                    <br />
                    Der angezeigte Standort ist der zuletzt lokal gespeicherte
                    Standort. Das Gerät ist aktuell offline und der SIM-Status
                    ist gesperrt bzw. unbekannt.
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Rechte Seite */}
          <div className="space-y-5">

            {/* Aktionen */}
            <section className="rounded-xl border border-[#1d323f] bg-[#0b1721]">
              <div className="border-b border-[#1b303d] px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Activity size={17} className="text-[#6da9ca]" />
                  Schnellaktionen
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-2">

                {[
                  {
                    icon: MapPin,
                    title: 'Standort abfragen',
                    text: 'Letzten bekannten Standort anzeigen.',
                    action: () =>
                      runAction(
                        'Standortabfrage wurde lokal protokolliert.'
                      ),
                  },
                  {
                    icon: Bell,
                    title: 'Gerät klingeln lassen',
                    text: 'Aktion wird lokal simuliert.',
                    action: () =>
                      runAction(
                        'Klingeln wurde lokal simuliert. Kein echtes Gerät wurde angesteuert.'
                      ),
                  },
                  {
                    icon: RefreshCw,
                    title: 'Status aktualisieren',
                    text: 'Lokale Gerätedaten aktualisieren.',
                    action: () =>
                      runAction('Gerätestatus wurde lokal aktualisiert.'),
                  },
                  {
                    icon: FileText,
                    title: 'Bericht erstellen',
                    text: 'Geräteinformationen sammeln.',
                    action: () =>
                      runAction('Gerätebericht wurde lokal vorbereitet.'),
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      onClick={item.action}
                      className="rounded-lg border border-[#1f3543] bg-[#0e1c27] p-4 text-left hover:border-[#3b5b6d] hover:bg-[#132533]"
                    >
                      <Icon size={19} className="text-[#6fa9cb]" />

                      <strong className="mt-2 block text-xs">
                        {item.title}
                      </strong>

                      <span className="mt-1 block text-[10px] leading-4 text-slate-600">
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Sicherheit */}
            <section className="rounded-xl border border-[#1d323f] bg-[#0b1721]">
              <div className="border-b border-[#1b303d] px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck size={17} className="text-[#6da9ca]" />
                  Sicherheit
                </div>
              </div>

              <div className="p-5">

                {[
                  {
                    icon: Lock,
                    title: 'Gerätesperre',
                    detail: 'Sicherheitsstatus',
                    state: 'Aktiv',
                    color: 'text-green-400',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Verwaltung',
                    detail: 'Lokale Geräteverwaltung',
                    state: 'Aktiv',
                    color: 'text-green-400',
                  },
                  {
                    icon: Radio,
                    title: 'SIM',
                    detail: 'Gesperrt / unbekannt',
                    state: 'Prüfen',
                    color: 'text-yellow-400',
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center justify-between border-b border-[#182b37] py-3 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className="text-[#6da9ca]" />

                        <div>
                          <div className="text-xs">
                            {item.title}
                          </div>

                          <div className="mt-1 text-[10px] text-slate-600">
                            {item.detail}
                          </div>
                        </div>
                      </div>

                      <span className={`text-xs ${item.color}`}>
                        {item.state}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Benutzer */}
            <section className="rounded-xl border border-[#1d323f] bg-[#0b1721]">
              <div className="flex items-center justify-between border-b border-[#1b303d] px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <User size={17} className="text-[#6da9ca]" />
                  Benutzerzuordnung
                </div>

                <button
                  onClick={() =>
                    runAction('Benutzerverwaltung wurde geöffnet.')
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#293d4c] bg-[#101d28] px-3 py-2 text-xs text-slate-300 hover:bg-[#172a39]"
                >
                  <Settings size={13} />
                  Verwalten
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">

                <div className="rounded-lg border border-[#1b303d] bg-[#0e1c27] p-3">
                  <div className="text-[11px] text-slate-600">
                    Benutzer
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-300">
                    <User size={13} />
                    {device.user}
                  </div>
                </div>

                <div className="rounded-lg border border-[#1b303d] bg-[#0e1c27] p-3">
                  <div className="text-[11px] text-slate-600">
                    Abteilung
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-300">
                    <Building2 size={13} />
                    {device.department}
                  </div>
                </div>

              </div>
            </section>

            {/* Verlauf */}
            <section className="rounded-xl border border-[#1d323f] bg-[#0b1721]">
              <div className="border-b border-[#1b303d] px-5 py-4">
                <div className="flex items-center gap
```
