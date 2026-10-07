"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Layers,
  Navigation,
  Smartphone,
  Satellite,
} from "lucide-react";

export default function MapPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#090e17]/95 px-6 backdrop-blur">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-300 hover:bg-white/[0.08]"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <div className="text-sm font-semibold">Karte</div>
            <div className="text-xs text-slate-500">
              Geräte und gespeicherte Standorte
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
          <MapPin size={14} />
          Standortkarte
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Gerätekarte</h1>
          <p className="mt-1 text-sm text-slate-400">
            Übersicht der zuletzt gespeicherten Gerätestandorte
          </p>
        </div>

        <div className="relative h-[calc(100vh-150px)] min-h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b111a]">
          {/* Karten-Hintergrund */}
          <div className="absolute inset-0">
            <div className="absolute left-[8%] top-[-10%] h-[120%] w-[3px] rotate-[28deg] bg-white/[0.08]" />
            <div className="absolute left-[23%] top-[-10%] h-[120%] w-[2px] rotate-[-18deg] bg-white/[0.06]" />
            <div className="absolute left-[44%] top-[-10%] h-[120%] w-[4px] rotate-[35deg] bg-white/[0.08]" />
            <div className="absolute left-[68%] top-[-10%] h-[120%] w-[2px] rotate-[-25deg] bg-white/[0.07]" />
            <div className="absolute left-[86%] top-[-10%] h-[120%] w-[3px] rotate-[18deg] bg-white/[0.06]" />

            <div className="absolute left-[-10%] top-[18%] h-[3px] w-[120%] rotate-[5deg] bg-white/[0.07]" />
            <div className="absolute left-[-10%] top-[39%] h-[4px] w-[120%] rotate-[-8deg] bg-white/[0.08]" />
            <div className="absolute left-[-10%] top-[64%] h-[2px] w-[120%] rotate-[4deg] bg-white/[0.06]" />
            <div className="absolute left-[-10%] top-[83%] h-[3px] w-[120%] rotate-[-4deg] bg-white/[0.07]" />

            <div className="absolute left-[10%] top-[12%] h-36 w-60 rounded-3xl border border-white/[0.04] bg-white/[0.025]" />
            <div className="absolute left-[55%] top-[16%] h-44 w-72 rounded-3xl border border-white/[0.04] bg-white/[0.025]" />
            <div className="absolute left-[30%] top-[60%] h-52 w-80 rounded-3xl border border-white/[0.04] bg-white/[0.02]" />
            <div className="absolute right-[5%] top-[58%] h-36 w-56 rounded-3xl border border-white/[0.04] bg-white/[0.025]" />
          </div>

          {/* Karten-Steuerung */}
          <div className="absolute left-5 top-5 z-20 flex gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#090e17]/95 px-4 py-3 text-sm backdrop-blur hover:bg-white/[0.08]">
              <Layers size={17} />
              Normal
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#090e17]/95 px-4 py-3 text-sm text-slate-400 backdrop-blur hover:bg-white/[0.08] hover:text-white">
              <Satellite size={17} />
              Satellit
            </button>
          </div>

          {/* Standort */}
          <button
            onClick={() => router.push("/dashboard/devices/iphone-sozan")}
            className="absolute left-[53%] top-[48%] z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute -inset-10 animate-pulse rounded-full bg-cyan-400/10" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-cyan-300/30 bg-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.25)]">
              <MapPin size={30} className="text-cyan-300" />
            </div>

            <div className="mt-3 min-w-[210px] rounded-xl border border-white/10 bg-[#090e17]/95 p-3 text-left shadow-xl backdrop-blur">
              <div className="flex items-center gap-2">
                <Smartphone size={15} className="text-cyan-300" />

                <span className="text-sm font-semibold">
                  iPhone 15 Pro
                </span>
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Sozan Evdal
              </div>

              <div className="mt-3 text-xs text-slate-400">
                Hannoversche Str. 1
                <br />
                30629 Hannover-Misburg-Anderten
              </div>

              <div className="mt-2 text-[11px] text-slate-600">
                Letzter Kontakt: 28.09.2026 · 21:37:33
              </div>
            </div>
          </button>

          {/* Standortbutton */}
          <button
            onClick={() => router.push("/dashboard/location")}
            className="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-[#090e17]/95 px-4 py-3 text-sm backdrop-blur hover:bg-white/[0.08]"
          >
            <Navigation size={17} className="text-cyan-300" />
            Standortabfrage
          </button>

          {/* Legende */}
          <div className="absolute bottom-5 left-5 z-20 rounded-xl border border-white/10 bg-[#090e17]/95 p-4 backdrop-blur">
            <div className="mb-3 text-xs font-semibold text-slate-300">
              Geräte
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              iPhone 15 Pro · Online
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}