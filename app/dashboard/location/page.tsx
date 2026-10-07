"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Search,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export default function LocationPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);

  function searchDevice() {
    setSearched(true);
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <header className="flex h-16 items-center border-b border-white/10 bg-[#090e17] px-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <div className="mx-4 h-6 w-px bg-white/10" />

        <div>
          <div className="font-semibold">Standortabfrage</div>
          <div className="text-xs text-slate-500">
            Letzten bekannten Standort eines Gerätes prüfen
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl p-8">
        <h1 className="text-2xl font-semibold">Standortabfrage</h1>

        <p className="mt-2 text-sm text-slate-500">
          Suche nach einem verwalteten Gerät.
        </p>

        <div className="mt-8 rounded-xl border border-white/10 bg-[#0d131d] p-6">
          <label className="mb-2 block text-sm text-slate-400">
            Gerät suchen
          </label>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="z. B. iPhone 15 Pro von Sozan Evdal"
                className="w-full rounded-lg border border-white/10 bg-[#080d15] py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500/50"
              />
            </div>

            <button
              onClick={searchDevice}
              className="rounded-lg bg-blue-600 px-5 text-sm font-medium hover:bg-blue-500"
            >
              Standort abfragen
            </button>
          </div>
        </div>

        {searched && (
          <div className="mt-6 rounded-xl border border-white/10 bg-[#0d131d] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Smartphone size={22} />
              </div>

              <div>
                <div className="font-medium">
                  iPhone 15 Pro von Sozan Evdal
                </div>
                <div className="text-xs text-slate-500">
                  Letzter gespeicherter Standort
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-white/10 bg-[#080d15] p-5">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 size={20} />
                Standortdaten vorhanden
              </div>

              <div className="mt-4 flex items-start gap-3">
                <MapPin className="mt-1 text-red-400" size={22} />

                <div>
                  <div className="font-medium">
                    Hannoversche Str. 1
                  </div>

                  <div className="text-sm text-slate-400">
                    30629 Hannover-Misburg-Anderten
                  </div>

                  <div className="mt-2 text-xs text-slate-600">
                    Letzte Aktualisierung: 28.09.2026 · 21:37:33
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/dashboard/devices/iphone-sozan")}
              className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              Gerätedetails öffnen
            </button>
          </div>
        )}
      </div>
    </main>
  );
}