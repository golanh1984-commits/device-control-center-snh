import Link from 'next/link';

const device = {
  name: 'iPhone 15 Pro von Sozan Evdal',
  assetId: 'SNH-IPH-015',
  type: 'iPhone',
  manufacturer: 'Apple',
  model: 'iPhone 15 Pro',
  serial: 'SNH-IPH15-SOZAN',
  imei: '35 123456 789012 3',
  user: 'Sozan Evdal',
  department: 'Verwaltung',
  status: 'Online',
  battery: '82 %',
  sim: 'Unbekannt / blockiert',
  lastContact: '28.09.2026 · 21:37:33',
  address: 'Hannoversche Str. 1',
  city: '30629 Hannover-Misburg-Anderten',
  accuracy: 'ca. 15 m',
};

const history = [
  {
    title: 'Standortabfrage',
    detail: 'Letzte bekannte Position wurde abgerufen.',
    state: 'Erfolgreich',
    color: 'text-emerald-400',
  },
  {
    title: 'Gerätestatus',
    detail: 'Gerät meldet sich mit Status Online.',
    state: 'Online',
    color: 'text-emerald-400',
  },
  {
    title: 'SIM-Status',
    detail: 'SIM-Status konnte nicht eindeutig ermittelt werden.',
    state: 'Unbekannt',
    color: 'text-amber-400',
  },
  {
    title: 'Letzter Kontakt',
    detail: '28.09.2026 · 21:37:33',
    state: 'Gespeichert',
    color: 'text-sky-400',
  },
];

export default function DeviceDetailPage() {
  return (
    <main className="min-h-screen bg-[#061018] text-white">
      <div className="border-b border-[#19303d] bg-[#08151e]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5">
          <div>
            <Link
              href="/dashboard/devices"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              ← Zurück zu Geräte
            </Link>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#294654] bg-[#0d202c] text-2xl">
                
              </div>

              <div>
                <h1 className="text-2xl font-semibold">
                  {device.name}
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  {device.model} · {device.assetId}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {device.status}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-8 py-8">
        <div className="grid grid-cols-4 gap-4">
          <StatusCard title="Gerätestatus" value={device.status} />
          <StatusCard title="Batterie" value={device.battery} />
          <StatusCard title="Letzter Kontakt" value="28.09.2026" />
          <StatusCard title="Genauigkeit" value={device.accuracy} />
        </div>

        <div className="mt-6 grid grid-cols-[1.5fr_1fr] gap-6">
          <section className="overflow-hidden rounded-2xl border border-[#1d3542] bg-[#0a1720]">
            <div className="flex items-center justify-between border-b border-[#1b303d] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold">Letzter bekannter Standort</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Gespeicherte / simulierte Standortdaten
                </p>
              </div>

              <Link
                href="/dashboard/map"
                className="rounded-lg border border-[#284451] bg-[#0d202b] px-4 py-2 text-xs text-slate-300 transition hover:bg-[#122936]"
              >
                Karte öffnen
              </Link>
            </div>

            <div className="relative h-[430px] overflow-hidden bg-[#101b20]">
              <div className="absolute inset-0 opacity-60">
                <div className="absolute left-[8%] top-[18%] h-[7px] w-[82%] rotate-[12deg] bg-[#2b3639]" />
                <div className="absolute left-[3%] top-[52%] h-[9px] w-[94%] rotate-[-8deg] bg-[#303b3e]" />
                <div className="absolute left-[20%] top-[5%] h-[92%] w-[7px] rotate-[24deg] bg-[#283438]" />
                <div className="absolute left-[64%] top-[-10%] h-[120%] w-[8px] rotate-[-19deg] bg-[#303b3e]" />
                <div className="absolute left-[37%] top-[34%] h-[180px] w-[180px] rounded-full border border-[#334449]" />
                <div className="absolute left-[42%] top-[40%] h-[90px] w-[90px] rounded-full border border-[#334449]" />
              </div>

              <div className="absolute left-[53%] top-[47%]">
                <div className="relative">
                  <div className="absolute -inset-5 animate-pulse rounded-full bg-cyan-400/10" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-cyan-500 shadow-xl shadow-cyan-500/20">
                    <span className="h-3 w-3 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 rounded-xl border border-[#29434f] bg-[#07121a]/95 px-5 py-4 backdrop-blur">
                <div className="text-xs text-slate-500">Letzte bekannte Position</div>
                <div className="mt-1 text-sm font-medium">
                  {device.address}
                </div>
                <div className="text-xs text-slate-400">
                  {device.city}
                </div>
                <div className="mt-2 text-[11px] text-slate-500">
                  {device.lastContact} · Genauigkeit {device.accuracy}
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-[#1d3542] bg-[#0a1720]">
              <div className="border-b border-[#1b303d] px-6 py-5">
                <h2 className="text-lg font-semibold">Geräteinformationen</h2>
              </div>

              <div className="divide-y divide-[#172b36]">
                <InfoRow label="Gerät" value={device.name} />
                <InfoRow label="Typ" value={device.type} />
                <InfoRow label="Hersteller" value={device.manufacturer} />
                <InfoRow label="Modell" value={device.model} />
                <InfoRow label="Asset-ID" value={device.assetId} />
                <InfoRow label="Benutzer" value={device.user} />
                <InfoRow label="Abteilung" value={device.department} />
              </div>
            </section>

            <section className="rounded-2xl border border-[#1d3542] bg-[#0a1720]">
              <div className="border-b border-[#1b303d] px-6 py-5">
                <h2 className="text-lg font-semibold">Technische Daten</h2>
              </div>

              <div className="divide-y divide-[#172b36]">
                <InfoRow label="Seriennummer" value={device.serial} />
                <InfoRow label="IMEI" value={device.imei} />
                <InfoRow label="SIM" value={device.sim} />
                <InfoRow label="Batterie" value={device.battery} />
                <InfoRow label="Letzter Kontakt" value={device.lastContact} />
              </div>
            </section>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <section className="rounded-2xl border border-[#1d3542] bg-[#0a1720]">
            <div className="border-b border-[#1b303d] px-6 py-5">
              <h2 className="text-lg font-semibold">Aktionen</h2>
              <p className="mt-1 text-xs text-slate-500">
                Aktionen sind lokal simuliert.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-6">
              <ActionButton label="Gerät klingeln lassen" />
              <ActionButton label="Standortabfrage starten" />
              <ActionButton label="Bericht erstellen" />
              <ActionButton label="Adresse kopieren" />
            </div>
          </section>

          <section className="rounded-2xl border border-[#1d3542] bg-[#0a1720]">
            <div className="border-b border-[#1b303d] px-6 py-5">
              <h2 className="text-lg font-semibold">Verlauf</h2>
            </div>

            <div className="px-6">
              {history.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between border-b border-[#182b37] py-4 last:border-0"
                >
                  <div>
                    <div className="text-sm">{item.title}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {item.detail}
                    </div>
                  </div>

                  <span className={`text-xs ${item.color}`}>
                    {item.state}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 text-xs text-amber-300">
          Hinweis: Die hier angezeigten Standort- und Geräteaktionen sind
          lokale bzw. simulierte Testdaten. Es wird kein echtes iPhone
          ferngesteuert oder heimlich verfolgt.
        </div>
      </div>
    </main>
  );
}

function StatusCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1d3542] bg-[#0a1720] px-5 py-5">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 px-6 py-3">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-right text-xs text-slate-200">{value}</span>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-xl border border-[#294451] bg-[#0d202b] px-4 py-3 text-left text-xs text-slate-200 transition hover:bg-[#122b38]"
    >
      {label}
    </button>
  );
}