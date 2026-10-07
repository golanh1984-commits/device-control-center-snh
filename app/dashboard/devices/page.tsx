"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BatteryMedium,
  CheckCircle2,
  ChevronRight,
  Filter,
  Laptop,
  MonitorSmartphone,
  Plus,
  RefreshCw,
  Search,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";

type Device = {
  id: string;
  name: string;
  type: "iPhone" | "iPad" | "Mac" | "Windows";
  user: string;
  department: string;
  status: "Online" | "Offline";
  battery: number;
  lastContact: string;
  location: string;
};

const initialDevices: Device[] = [
  {
    id: "iphone-sozan",
    name: "iPhone 15 Pro von Sozan Evdal",
    type: "iPhone",
    user: "Sozan Evdal",
    department: "Verwaltung",
    status: "Offline",
    battery: 67,
    lastContact: "28.09.2026 · 21:37",
    location: "Hannoversche Str. 1, Hannover",
  },
  {
    id: "ipad-laurens",
    name: "iPad Pro 11",
    type: "iPad",
    user: "Laurens Hasan",
    department: "IT-Support",
    status: "Online",
    battery: 92,
    lastContact: "Heute · 14:02",
    location: "snutig GmbH · Herford",
  },
  {
    id: "mac-anton",
    name: "MacBook Pro 14",
    type: "Mac",
    user: "Anton P.",
    department: "Geschäftsführung",
    status: "Online",
    battery: 81,
    lastContact: "Heute · 13:58",
    location: "snutig GmbH · Herford",
  },
  {
    id: "windows-office",
    name: "SNH-WIN-024",
    type: "Windows",
    user: "Iheb K.",
    department: "IT",
    status: "Online",
    battery: 100,
    lastContact: "Heute · 13:55",
    location: "snutig GmbH · Herford",
  },
  {
    id: "iphone-support",
    name: "iPhone 14",
    type: "iPhone",
    user: "IT Support",
    department: "IT",
    status: "Offline",
    battery: 34,
    lastContact: "07.10.2026 · 11:42",
    location: "Unbekannt",
  },
];

export default function DevicesPage() {
  const router = useRouter();

  const [devices, setDevices] = useState(initialDevices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [typeFilter, setTypeFilter] = useState("Alle");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [message, setMessage] = useState("");

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const searchMatch =
        device.name.toLowerCase().includes(search.toLowerCase()) ||
        device.user.toLowerCase().includes(search.toLowerCase()) ||
        device.department.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "Alle" || device.status === statusFilter;

      const typeMatch =
        typeFilter === "Alle" || device.type === typeFilter;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [devices, search, statusFilter, typeFilter]);

  function getIcon(type: Device["type"]) {
    if (type === "iPhone") return <Smartphone size={22} />;
    if (type === "iPad") return <Tablet size={22} />;
    if (type === "Mac") return <Laptop size={22} />;
    return <MonitorSmartphone size={22} />;
  }

  function openDevice(device: Device) {
    if (device.id === "iphone-sozan") {
      router.push("/dashboard/devices/iphone-sozan");
      return;
    }

    setSelectedDevice(device);
  }

  function refreshDevices() {
    setMessage("Geräteliste wurde aktualisiert.");
    setTimeout(() => setMessage(""), 2500);
  }

  function addDevice(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const newDevice: Device = {
      id: `device-${Date.now()}`,
      name: String(form.get("name") || "Neues Gerät"),
      type: String(form.get("type") || "iPhone") as Device["type"],
      user: String(form.get("user") || "Nicht zugewiesen"),
      department: String(form.get("department") || "Nicht angegeben"),
      status: "Online",
      battery: 100,
      lastContact: "Gerade eben",
      location: "Noch nicht ermittelt",
    };

    setDevices((current) => [newDevice, ...current]);
    setShowAdd(false);
    setMessage("Gerät wurde hinzugefügt.");
    setTimeout(() => setMessage(""), 2500);
  }

  function exportDevices() {
    const csv = [
      "Gerät;Typ;Benutzer;Abteilung;Status;Akku;Letzter Kontakt;Standort",
      ...filteredDevices.map(
        (device) =>
          `${device.name};${device.type};${device.user};${device.department};${device.status};${device.battery}%;${device.lastContact};${device.location}`
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "snh-geraete.csv";
    link.click();

    URL.revokeObjectURL(url);

    setMessage("Geräteliste wurde exportiert.");
    setTimeout(() => setMessage(""), 2500);
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      {/* TOPBAR */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#090e17]/95 px-6 backdrop-blur">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <div className="h-6 w-px bg-white/10" />

          <div>
            <div className="text-sm font-semibold">Geräte</div>
            <div className="text-xs text-slate-500">
              Device Control Center SNH
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshDevices}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
          >
            <RefreshCw size={16} />
            Aktualisieren
          </button>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-500"
          >
            <Plus size={17} />
            Gerät hinzufügen
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] p-6">
        {/* HEADER */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Geräteverwaltung</h1>
            <p className="mt-1 text-sm text-slate-500">
              Alle verwalteten Geräte im SNH-System
            </p>
          </div>

          <button
            onClick={exportDevices}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Liste exportieren
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {message}
          </div>
        )}

        {/* FILTER */}
        <section className="mb-5 rounded-xl border border-white/10 bg-[#0d131d] p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[280px] flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Gerät, Benutzer oder Abteilung suchen..."
                className="w-full rounded-lg border border-white/10 bg-[#080d15] py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
              />
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <Filter size={17} />
              <span className="text-sm">Filter:</span>
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#080d15] px-3 py-2.5 text-sm text-slate-300 outline-none"
            >
              <option>Alle</option>
              <option>Online</option>
              <option>Offline</option>
            </select>

            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#080d15] px-3 py-2.5 text-sm text-slate-300 outline-none"
            >
              <option>Alle</option>
              <option>iPhone</option>
              <option>iPad</option>
              <option>Mac</option>
              <option>Windows</option>
            </select>
          </div>
        </section>

        {/* DEVICE LIST */}
        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#0d131d]">
          <div className="grid grid-cols-[2fr_1fr_1fr_120px_140px_40px] border-b border-white/10 px-5 py-3 text-xs uppercase tracking-wider text-slate-600">
            <div>Gerät</div>
            <div>Benutzer</div>
            <div>Abteilung</div>
            <div>Status</div>
            <div>Letzter Kontakt</div>
            <div />
          </div>

          {filteredDevices.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="mx-auto mb-3 text-slate-600" size={32} />
              <div className="font-medium">Keine Geräte gefunden</div>
              <div className="mt-1 text-sm text-slate-500">
                Ändere deine Suche oder die Filter.
              </div>
            </div>
          ) : (
            filteredDevices.map((device) => (
              <button
                key={device.id}
                onClick={() => openDevice(device)}
                className="grid w-full grid-cols-[2fr_1fr_1fr_120px_140px_40px] items-center border-b border-white/[0.06] px-5 py-4 text-left transition last:border-b-0 hover:bg-white/[0.035]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300">
                    {getIcon(device.type)}
                  </div>

                  <div>
                    <div className="font-medium text-white">
                      {device.name}
                    </div>

                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                      <span>{device.type}</span>

                      <span className="flex items-center gap-1">
                        <BatteryMedium size={13} />
                        {device.battery}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-300">
                    {device.user}
                  </div>
                </div>

                <div className="text-sm text-slate-400">
                  {device.department}
                </div>

                <div>
                  {device.status === "Online" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                      <Wifi size={13} />
                      Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-2.5 py-1 text-xs text-slate-400">
                      <WifiOff size={13} />
                      Offline
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500">
                  {device.lastContact}
                </div>

                <div className="flex justify-end text-slate-600">
                  <ChevronRight size={18} />
                </div>
              </button>
            ))
          )}
        </section>

        {/* RESULT COUNT */}
        <div className="mt-4 text-xs text-slate-600">
          {filteredDevices.length} von {devices.length} Geräten angezeigt
        </div>
      </div>

      {/* DETAIL PANEL */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0d131d] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <div className="text-lg font-semibold">
                  {selectedDevice.name}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  Gerätedetails
                </div>
              </div>

              <button
                onClick={() => setSelectedDevice(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6">
              <Info label="Gerät" value={selectedDevice.name} />
              <Info label="Typ" value={selectedDevice.type} />
              <Info label="Benutzer" value={selectedDevice.user} />
              <Info label="Abteilung" value={selectedDevice.department} />
              <Info label="Status" value={selectedDevice.status} />
              <Info label="Akku" value={`${selectedDevice.battery}%`} />
              <Info
                label="Letzter Kontakt"
                value={selectedDevice.lastContact}
              />
              <Info
                label="Letzter Standort"
                value={selectedDevice.location}
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4">
              <button
                onClick={() => setSelectedDevice(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD DEVICE */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
          <form
            onSubmit={addDevice}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131d] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <div className="text-lg font-semibold">
                  Gerät hinzufügen
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  Neues Gerät lokal zum System hinzufügen
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <Field
                name="name"
                label="Gerätename"
                placeholder="z. B. iPhone 16 Pro"
              />

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Gerätetyp
                </label>

                <select
                  name="type"
                  defaultValue="iPhone"
                  className="w-full rounded-lg border border-white/10 bg-[#080d15] px-3 py-2.5 text-sm text-white outline-none"
                >
                  <option>iPhone</option>
                  <option>iPad</option>
                  <option>Mac</option>
                  <option>Windows</option>
                </select>
              </div>

              <Field
                name="user"
                label="Benutzer"
                placeholder="z. B. Max Mustermann"
              />

              <Field
                name="department"
                label="Abteilung"
                placeholder="z. B. IT"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
              >
                Abbrechen
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
              >
                Gerät hinzufügen
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
      <div className="text-xs uppercase tracking-wider text-slate-600">
        {label}
      </div>
      <div className="mt-2 text-sm text-slate-200">{value}</div>
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-400">
        {label}
      </label>

      <input
        name={name}
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-[#080d15] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50"
      />
    </div>
  );
}