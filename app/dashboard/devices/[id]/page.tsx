"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BatteryMedium,
  Bell,
  CheckCircle2,
  Clock3,
  Copy,
  Cpu,
  FileText,
  MapPin,
  Navigation,
  Phone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  UserRound,
  Wifi,
  WifiOff,
} from "lucide-react";

export default function DeviceDetails() {
  const router = useRouter();
  const params = useParams();
  const id = String(params.id ?? "");

  const [message, setMessage] = useState("");
  const [ringing, setRinging] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  if (id !== "iphone-sozan") {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#07111d",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        Gerät nicht gefunden.
      </main>
    );
  }

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3500);
  }

  function ringDevice() {
    if (ringing) return;

    setRinging(true);
    showMessage("Klingelvorgang wurde lokal gestartet.");

    setTimeout(() => {
      setRinging(false);
    }, 5000);
  }

  function queryLocation() {
    if (locationLoading) return;

    setLocationLoading(true);

    setTimeout(() => {
      setLocationLoading(false);
      showMessage(
        "Letzter bekannter Standort wurde erfolgreich abgerufen."
      );
    }, 1200);
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    showMessage("Information wurde kopiert.");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07111d",
        color: "#e8f0f7",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* TOPBAR */}
      <header
        style={{
          height: "68px",
          background: "#0a1623",
          borderBottom: "1px solid #1d3347",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "#1677ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "12px",
            }}
          >
            SNH
          </div>

          <div>
            <div style={{ fontSize: "15px", fontWeight: 750 }}>
              Device Control Center
            </div>

            <div
              style={{
                color: "#6e8498",
                fontSize: "10px",
                marginTop: "2px",
              }}
            >
              snutig GmbH · Interne Geräteverwaltung
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#79d992",
            fontSize: "12px",
          }}
        >
          <CheckCircle2 size={15} />
          System online
        </div>
      </header>

      <div style={{ padding: "28px 34px" }}>
        {/* BACK */}
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            border: "none",
            background: "transparent",
            color: "#7790a5",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: 0,
            cursor: "pointer",
            fontSize: "12px",
            marginBottom: "20px",
          }}
        >
          <ArrowLeft size={15} />
          Zurück zur Übersicht
        </button>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "17px",
            }}
          >
            <div
              style={{
                width: "62px",
                height: "62px",
                borderRadius: "14px",
                background: "#10283e",
                border: "1px solid #21435f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#69a9f7",
              }}
            >
              <Smartphone size={30} />
            </div>

            <div>
              <div
                style={{
                  color: "#6d859a",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "5px",
                }}
              >
                Gerätedetails
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "25px",
                  letterSpacing: "-0.4px",
                }}
              >
                iPhone 15 Pro von Sozan Evdal
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "7px",
                  fontSize: "12px",
                  color: "#7fd99a",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#4bd27b",
                  }}
                />
                Online · Verbindung aktiv
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "9px",
            }}
          >
            <button
              onClick={queryLocation}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #29455d",
                background: "#0c1b2a",
                color: "#b7c9d9",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              <Navigation size={14} />
              {locationLoading ? "Abfrage läuft…" : "Standort abfragen"}
            </button>

            <button
              onClick={ringDevice}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #1677ff",
                background: "#1677ff",
                color: "#fff",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 650,
              }}
            >
              <Bell size={14} />
              {ringing ? "Klingelt…" : "Gerät klingeln lassen"}
            </button>
          </div>
        </div>

        {message && (
          <div
            style={{
              background: "#0d2639",
              border: "1px solid #24516f",
              borderRadius: "9px",
              padding: "11px 14px",
              marginBottom: "18px",
              color: "#b8d6ec",
              fontSize: "12px",
            }}
          >
            {message}
          </div>
        )}

        {/* STATUS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "13px",
            marginBottom: "18px",
          }}
        >
          {[
            ["Status", "Online", Wifi],
            ["Akku", "78 %", BatteryMedium],
            ["SIM", "Unbekannt", WifiOff],
            ["Letzter Kontakt", "28.09.2026 · 21:37", Clock3],
          ].map(([label, value, Icon]) => {
            const IconComponent = Icon as React.ComponentType<{
              size?: number;
            }>;

            return (
              <div
                key={String(label)}
                style={{
                  background: "#0b1927",
                  border: "1px solid #1d3449",
                  borderRadius: "11px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#647c90",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                  }}
                >
                  {String(label)}
                  <IconComponent size={14} />
                </div>

                <div
                  style={{
                    marginTop: "9px",
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  {String(value)}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.45fr 1fr",
            gap: "18px",
          }}
        >
          {/* LEFT */}
          <div>
            {/* MAP */}
            <section
              style={{
                background: "#0b1927",
                border: "1px solid #1d3449",
                borderRadius: "13px",
                overflow: "hidden",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  padding: "16px 18px",
                  borderBottom: "1px solid #1d3449",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700 }}>
                    Letzter bekannter Standort
                  </div>

                  <div
                    style={{
                      color: "#698096",
                      fontSize: "10px",
                      marginTop: "4px",
                    }}
                  >
                    Standortdaten · 28.09.2026 · 21:37:33
                  </div>
                </div>

                <MapPin size={17} color="#4f9af7" />
              </div>

              <div
                style={{
                  height: "330px",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "#10202e",
                  backgroundImage:
                    "linear-gradient(rgba(93,130,155,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(93,130,155,0.10) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              >
                {/* Streets */}
                <div
                  style={{
                    position: "absolute",
                    width: "120%",
                    height: "13px",
                    background: "#304452",
                    transform: "rotate(-18deg)",
                    top: "125px",
                    left: "-8%",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    width: "110%",
                    height: "9px",
                    background: "#263946",
                    transform: "rotate(28deg)",
                    top: "190px",
                    left: "-4%",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    width: "8px",
                    height: "120%",
                    background: "#273c49",
                    transform: "rotate(10deg)",
                    left: "56%",
                    top: "-10%",
                  }}
                />

                {/* Pin */}
                <div
                  style={{
                    position: "absolute",
                    left: "54%",
                    top: "47%",
                    transform: "translate(-50%, -50%)",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(22,119,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "17px",
                      height: "17px",
                      borderRadius: "50%",
                      background: "#1677ff",
                      border: "3px solid #d9edff",
                      boxShadow: "0 0 0 8px rgba(22,119,255,0.16)",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "15px",
                    background: "rgba(7,17,29,0.92)",
                    border: "1px solid #294357",
                    borderRadius: "8px",
                    padding: "9px 11px",
                    fontSize: "10px",
                    color: "#a6bacb",
                  }}
                >
                  Hannoversche Str. 1
                  <br />
                  30629 Hannover-Misburg-Anderten
                </div>
              </div>
            </section>

            {/* LOCATION */}
            <section
              style={{
                background: "#0b1927",
                border: "1px solid #1d3449",
                borderRadius: "13px",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  marginBottom: "17px",
                }}
              >
                <MapPin size={16} color="#559ff8" />
                <div style={{ fontSize: "14px", fontWeight: 700 }}>
                  Standortinformationen
                </div>
              </div>

              {[
                ["Adresse", "Hannoversche Str. 1"],
                ["PLZ / Ort", "30629 Hannover-Misburg-Anderten"],
                ["Land", "Deutschland"],
                ["Zeitpunkt", "28.09.2026 · 21:37:33"],
                ["Genauigkeit", "ca. 15 m"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #152b3e",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#698096" }}>{label}</span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {value}

                    {label === "Adresse" && (
                      <button
                        onClick={() => copy(value)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#66849d",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <Copy size={12} />
                      </button>
                    )}
                  </span>
                </div>
              ))}

              <div
                style={{
                  marginTop: "14px",
                  color: "#71889c",
                  fontSize: "10px",
                  lineHeight: 1.5,
                }}
              >
                Die Standortanzeige dieser lokalen Anwendung verwendet
                gespeicherte bzw. simulierte Gerätedaten.
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div>
            {/* USER */}
            <section
              style={{
                background: "#0b1927",
                border: "1px solid #1d3449",
                borderRadius: "13px",
                padding: "18px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: "#657d91",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  marginBottom: "13px",
                }}
              >
                Zugewiesener Benutzer
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#173653",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserRound size={18} />
                </div>

                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700 }}>
                    Sozan Evdal
                  </div>

                  <div
                    style={{
                      color: "#71879b",
                      fontSize: "11px",
                      marginTop: "3px",
                    }}
                  >
                    Mitarbeiter · Verwaltung
                  </div>
                </div>
              </div>
            </section>

            {/* TECHNICAL */}
            <section
              style={{
                background: "#0b1927",
                border: "1px solid #1d3449",
                borderRadius: "13px",
                padding: "18px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "15px",
                }}
              >
                <Cpu size={16} color="#559ff8" />
                <div style={{ fontSize: "14px", fontWeight: 700 }}>
                  Technische Daten
                </div>
              </div>

              {[
                ["Gerät", "iPhone 15 Pro"],
                ["Asset-ID", "SNH-IPH-001"],
                ["Hersteller", "Apple"],
                ["Seriennummer", "SNH-IP15P-001"],
                ["IMEI", "356789102345671"],
                ["Betriebssystem", "iOS 26"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "9px 0",
                    borderBottom: "1px solid #152b3e",
                    fontSize: "11px",
                  }}
                >
                  <span style={{ color: "#667f94" }}>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </section>

            {/* SECURITY */}
            <section
              style={{
                background: "#0b1927",
                border: "1px solid #1d3449",
                borderRadius: "13px",
                padding: "18px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "15px",
                }}
              >
                <ShieldCheck size={16} color="#65d08a" />
                <div style={{ fontSize: "14px", fontWeight: 700 }}>
                  Sicherheit
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#7ed99a",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                <CheckCircle2 size={14} />
                Geräteschutz aktiv
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#7ed99a",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                <CheckCircle2 size={14} />
                Passcode geschützt
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#e0b66b",
                  fontSize: "12px",
                }}
              >
                <WifiOff size={14} />
                SIM-Status nicht verfügbar
              </div>
            </section>

            {/* ACTIONS */}
            <section
              style={{
                background: "#0b1927",
                border: "1px solid #1d3449",
                borderRadius: "13px",
                padding: "18px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "14px",
                }}
              >
                Aktionen
              </div>

              <button
                onClick={ringDevice}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px",
                  borderRadius: "8px",
                  border: "1px solid #28445c",
                  background: "#0e2031",
                  color: "#b9cbd9",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginBottom: "8px",
                }}
              >
                <Phone size={14} />
                Gerät klingeln lassen
              </button>

              <button
                onClick={queryLocation}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px",
                  borderRadius: "8px",
                  border: "1px solid #28445c",
                  background: "#0e2031",
                  color: "#b9cbd9",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginBottom: "8px",
                }}
              >
                <RefreshCw size={14} />
                Standort aktualisieren
              </button>

              <button
                onClick={() => showMessage("Gerätebericht wurde erstellt.")}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px",
                  borderRadius: "8px",
                  border: "1px solid #28445c",
                  background: "#0e2031",
                  color: "#b9cbd9",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                <FileText size={14} />
                Gerätebericht erstellen
              </button>
            </section>
          </div>
        </div>

        {/* HISTORY */}
        <section
          style={{
            marginTop: "18px",
            background: "#0b1927",
            border: "1px solid #1d3449",
            borderRadius: "13px",
            padding: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <Clock3 size={16} color="#559ff8" />
            <div style={{ fontSize: "14px", fontWeight: 700 }}>
              Aktivitätsverlauf
            </div>
          </div>

          {[
            ["28.09.2026 · 21:37:33", "Standort gespeichert"],
            ["28.09.2026 · 21:35:11", "Gerät online"],
            ["28.09.2026 · 20:58:42", "Gerätestatus aktualisiert"],
            ["27.09.2026 · 18:12:04", "Letzte Synchronisierung"],
          ].map(([time, action]) => (
            <div
              key={time}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 0",
                borderBottom: "1px solid #152b3e",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#428ee4",
                }}
              />

              <div style={{ flex: 1, fontSize: "12px" }}>
                {action}
              </div>

              <div
                style={{
                  fontSize: "10px",
                  color: "#60778c",
                }}
              >
                {time}
              </div>
            </div>
          ))}
        </section>

        <div
          style={{
            marginTop: "18px",
            color: "#4d6478",
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          Device Control Center SNH · Lokale Geräteverwaltung · v1.0
        </div>
      </div>
    </main>
  );
}