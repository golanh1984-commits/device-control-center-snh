"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Smartphone,
  Search,
  RefreshCw,
  Clock,
  Navigation,
  ShieldCheck,
} from "lucide-react";

export default function LocationPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const device = {
    name: "iPhone 15 Pro von Sozan Evdal",
    user: "Sozan Evdal",
    status: "Online",
    location: "Hannoversche Str. 1",
    city: "30629 Hannover-Misburg-Anderten",
    country: "Deutschland",
    time: "28.09.2026 · 21:37:33",
    accuracy: "ca. 15 m",
  };

  function updateLocation() {
    setMessage("Standortabfrage wurde durchgeführt.");
    setTimeout(() => setMessage(""), 3000);
  }

  function openDevice() {
    router.push("/dashboard/devices/iphone-sozan");
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      {/* TOPBAR */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#090e17]/95 px-6 backdrop-blur">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <div className="text-sm font-semibold">Standortabfrage</div>
            <div className="text-xs text-slate-500">
              Device Control Center SNH
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          System aktiv
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] p-6">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Standortabfrage</h1>
          <p className="mt-1 text-sm text-slate-400">
            Gespeicherte Standortinformationen der verwalteten Geräte
          </p>
        </div>

        {/* SEARCH */}
        <section className="mb-6 rounded-2xl border border-white/10 bg-[#0c121c] p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Gerät, Benutzer oder Standort suchen..."
                className="w-full rounded-xl border border-white/10 bg-[#080d15] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
              />
            </div>

            <button
              onClick={updateLocation}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
            >
              <RefreshCw size={17} />
              Abfrage starten
            </button>
          </div>
        </section>

        {/* MESSAGE */}
        {message && (
          <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            {message}
          </div>
        )}

        {/* MAIN */}
        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          {/* MAP */}
          <section className="relative min-h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b111a]">
            {/* fake map */}
            <div className="absolute inset-0 opacity-80">
              <div className="absolute left-[8%] top-0 h-full w-[2px] rotate-[18deg] bg-white/[0.07]" />
              <div className="absolute left-[25%] top-[-10%] h-[120%] w-[3px] rotate-[42deg] bg-white/[0.08]" />
              <div className="absolute left-[52%] top-[-10%] h-[120%] w-[2px] rotate-[-22deg] bg-white/[0.07]" />
              <div className="absolute left-[76%] top-[-10%] h-[120%] w-[3px] rotate-[28deg] bg-white/[0.08]" />

              <div className="absolute left-0 top-[25%] h-[2px] w-full rotate-[4deg] bg-white/[0.07]" />
              <div className="absolute left-0 top-[48%] h-[3px] w-full rotate-[-7deg] bg-white/[0.08]" />
              <div className="absolute left-0 top-[72%] h-[2px] w-full rotate-[3deg] bg-white/[0.07]" />

              <div className="absolute left-[15%] top-[18%] h-32 w-52 rounded-3xl border border-white/[0.04] bg-white/[0.025]" />
              <div className="absolute right-[12%] top-[58%] h-40 w-64 rounded-3xl border border-white/[0.04] bg-white/[0.025]" />
            </div>

            {/* map header */}
            <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between">
              <div className="rounded-xl border border-white/10 bg-[#090e17]/90 px-4 py-3 backdrop-blur">
                <div className="text-xs text-slate-500">Letzter bekannter Standort</div>
                <div className="mt-1 text-sm font-semibold">
                  Hannover-Misburg-Anderten
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#090e17]/90 px-3 py-2 text-xs text-slate-400 backdrop-blur">
                Lokale Standortdaten
              </div>
            </div>

            {/* pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute -inset-8 animate-pulse rounded-full bg-cyan-400/10" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-cyan-300/30 bg-cyan-500/20 shadow-[0_0_45px_rgba(34,211,238,0.25)]">
                <MapPin size={30} className="text-cyan-300" />
              </div>

              <div className="mt-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#090e17]/95 px-3 py-2 text-center text-xs shadow-xl">
                <div className="font-semibold text-white">
                  iPhone 15 Pro
                </div>
                <div className="text-slate-500">Sozan Evdal</div>
              </div>
            </div>

            {/* bottom info */}
            <div className="absolute bottom-5 left-5 right-5 z-10 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#090e17]/95 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Navigation size={14} />
                  Genauigkeit
                </div>
                <div className="mt-2 text-lg font-semibold">
                  {device.accuracy}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#090e17]/95 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={14} />
                  Letzter Kontakt
                </div>
                <div className="mt-2 text-sm font-semibold">
                  {device.time}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#090e17]/95 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck size={14} />
                  Status
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {device.status}
                </div>
              </div>
            </div>
          </section>

          {/* DETAILS */}
          <aside className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-[#0c121c] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                  <Smartphone size={21} className="text-cyan-300" />
                </div>

                <div>
                  <div className="text-sm font-semibold">{device.name}</div>
                  <div className="text-xs text-slate-500">
                    Verwaltetes Gerät
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-500">Benutzer</div>
                  <div className="mt-1 text-sm">{device.user}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-500">Adresse</div>
                  <div className="mt-1 text-sm leading-6">
                    {device.location}
                    <br />
                    {device.city}
                    <br />
                    {device.country}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500">
                    Letzte Standortzeit
                  </div>
                  <div className="mt-1 text-sm">{device.time}</div>
                </div>
              </div>

              <button
                onClick={openDevice}
                className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium transition hover:bg-white/[0.08]"
              >
                Gerätedetails öffnen
              </button>
            </section>

            <section className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
              <div className="text-sm font-semibold text-amber-300">
                Standortinformation
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Angezeigt werden gespeicherte bzw. lokal simulierte
                Standortdaten. Es wird kein echtes Gerät ferngesteuert oder
                heimlich verfolgt.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}