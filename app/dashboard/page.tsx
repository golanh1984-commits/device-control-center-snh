"use client";

import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BatteryMedium,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Laptop,
  MapPin,
  MonitorSmartphone,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Smartphone,
  Tablet,
  UserRound,
  Wifi,
  WifiOff,
} from "lucide-react";

type Device = {
  name: string;
  assetId: string;
  type: string;
  user: string;
  location: string;
  status: "online" | "offline";
  battery: number;
  lastContact: string;
};

const devices: Device[] = [
  {
    name: "iPhone 15 Pro von Sozan Evdal",
    assetId: "SNH-IPH-001",
    type: "iPhone",
    user: "Sozan Evdal",
    location: "Hannover-Misburg-Anderten",
    status: "online",
    battery: 78,
    lastContact: "28.09.2026 · 21:37:33",
  },
  {
    name: "iPad Pro 12,9 – Verwaltung",
    assetId: "SNH-IPD-014",
    type: "iPad",
    user: "Verwaltung",
    location: "Herford",
    status: "online",
    battery: 91,
    lastContact: "Heute · 12:48",
  },
  {
    name: "MacBook Pro – IT Support",
    assetId: "SNH-MAC-008",
    type: "Mac",
    user: "Laurens Hasan",
    location: "Herford",
    status: "online",
    battery: 64,
    lastContact: "Heute · 12:51",
  },
  {
    name: "Windows Notebook – Vertrieb",
    assetId: "SNH-WIN-023",
    type: "Windows",
    user: "Anton P.",
    location: "Bielefeld",
    status: "offline",
    battery: 32,
    lastContact: "Heute · 09:14",
  },
];

function DeviceIcon({ type }: { type: string }) {
  if (type === "iPhone") return <Smartphone size={20} />;
  if (type === "iPad") return <Tablet size={20} />;
  if (type === "Mac") return <Laptop size={20} />;
  return <MonitorSmartphone size={20} />;
}

const navigation = [
  { name: "Übersicht", path: "/dashboard", icon: Activity },
  { name: "Geräte", path: "/dashboard/devices", icon: MonitorSmartphone },
  { name: "Standortabfrage", path: "/dashboard/location", icon: MapPin },
  { name: "Karte", path: "/dashboard/map", icon: MapPin },
  { name: "Aktionen", path: "/dashboard/actions", icon: Server },
  { name: "Benutzer", path: "/dashboard/users", icon: UserRound },
  { name: "Verlauf", path: "/dashboard/history", icon: Clock3 },
  { name: "Sicherheit", path: "/dashboard/security", icon: ShieldCheck },
  { name: "Berichte", path: "/dashboard/reports", icon: Activity },
  { name: "Einstellungen", path: "/dashboard/settings", icon: Settings },
];

export default function Dashboard() {
  const router = useRouter();

  function openDevice(device: Device) {
    if (device.name === "iPhone 15 Pro von Sozan Evdal") {
      router.push("/dashboard/devices/iphone-sozan");
      return;
    }

    router.push("/dashboard/devices");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07111d",
        color: "#e7eef6",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <header
        style={{
          height: "68px",
          borderBottom: "1px solid #1c3043",
          background: "#0a1623",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
              fontSize: "13px",
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
                fontSize: "11px",
                color: "#70869c",
              }}
            >
              snutig GmbH · Interne Verwaltung
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "12px",
              color: "#7fd99a",
            }}
          >
            <CheckCircle2 size={15} />
            System online
          </div>

          <button
            onClick={() => router.push("/dashboard/users")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              paddingLeft: "18px",
              border: "none",
              borderLeft: "1px solid #263b4e",
              background: "transparent",
              color: "#e7eef6",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "31px",
                height: "31px",
                borderRadius: "50%",
                background: "#173451",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserRound size={16} />
            </div>

            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "12px", fontWeight: 700 }}>
                Laurens Hasan
              </div>

              <div
                style={{
                  fontSize: "10px",
                  color: "#71869a",
                }}
              >
                Administrator
              </div>
            </div>
          </button>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "230px 1fr",
          minHeight: "calc(100vh - 68px)",
        }}
      >
        <aside
          style={{
            borderRight: "1px solid #1c3043",
            background: "#091522",
            padding: "24px 14px",
          }}
        >
          <div
            style={{
              color: "#61788e",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "1px",
              padding: "0 12px 10px",
            }}
          >
            VERWALTUNG
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.path === "/dashboard";

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  padding: "10px 12px",
                  marginBottom: "3px",
                  borderRadius: "8px",
                  border: "none",
                  background: active
                    ? "rgba(22,119,255,0.14)"
                    : "transparent",
                  color: active ? "#5ca5ff" : "#8297aa",
                  fontSize: "13px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <Icon size={16} />
                {item.name}
              </button>
            );
          })}

          <div
            style={{
              marginTop: "30px",
              padding: "14px",
              borderRadius: "10px",
              background: "#0d1d2d",
              border: "1px solid #1c3348",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#657c91",
                marginBottom: "8px",
              }}
            >
              SYSTEMSTATUS
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "12px",
                color: "#81d79a",
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
              Alle Dienste aktiv
            </div>
          </div>
        </aside>

        <section style={{ padding: "30px 34px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "26px",
            }}
          >
            <div>
              <div
                style={{
                  color: "#668198",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "7px",
                }}
              >
                Übersicht
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "28px",
                  letterSpacing: "-0.6px",
                }}
              >
                Geräteverwaltung
              </h1>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#73899d",
                  fontSize: "13px",
                }}
              >
                Übersicht über verwaltete Geräte und aktuellen Status.
              </p>
            </div>

            <button
              onClick={() => router.push("/dashboard/devices")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                background: "#0b1927",
                border: "1px solid #20384e",
                borderRadius: "9px",
                padding: "10px 13px",
                color: "#748ba0",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              <Search size={16} />
              Geräte durchsuchen
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px",
              marginBottom: "26px",
            }}
          >
            {[
              ["Geräte gesamt", "24", MonitorSmartphone, "/dashboard/devices"],
              ["Online", "21", Wifi, "/dashboard/devices"],
              ["Offline", "3", WifiOff, "/dashboard/devices"],
              ["Warnungen", "2", AlertTriangle, "/dashboard/security"],
            ].map(([title, value, Icon, path]) => {
              const IconComponent = Icon as React.ComponentType<{
                size?: number;
              }>;

              return (
                <button
                  key={String(title)}
                  onClick={() => router.push(String(path))}
                  style={{
                    textAlign: "left",
                    background: "#0b1927",
                    border: "1px solid #1d3449",
                    borderRadius: "12px",
                    padding: "18px",
                    color: "#e7eef6",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#72889c",
                      fontSize: "11px",
                    }}
                  >
                    {String(title)}
                    <IconComponent size={15} />
                  </div>

                  <div
                    style={{
                      fontSize: "27px",
                      fontWeight: 750,
                      marginTop: "10px",
                    }}
                  >
                    {String(value)}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              background: "#0b1927",
              border: "1px solid #1d3449",
              borderRadius: "13px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "17px 19px",
                borderBottom: "1px solid #1d3449",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700 }}>
                  Geräte
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: "#6f8598",
                    marginTop: "4px",
                  }}
                >
                  Aktuell verwaltete Endgeräte
                </div>
              </div>

              <button
                onClick={() => router.push("/dashboard/devices")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#579cf5",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                Alle Geräte →
              </button>
            </div>

            {devices.map((device) => (
              <div
                key={device.assetId}
                onClick={() => openDevice(device)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1.3fr 1fr 40px",
                  alignItems: "center",
                  gap: "15px",
                  padding: "17px 19px",
                  borderBottom: "1px solid #152b3e",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "9px",
                      background: "#11263a",
                      color: "#72aefb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DeviceIcon type={device.type} />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      {device.name}
                    </div>

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#61798e",
                        marginTop: "3px",
                      }}
                    >
                      {device.assetId}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#5f778c",
                      marginBottom: "4px",
                    }}
                  >
                    BENUTZER
                  </div>

                  <div style={{ fontSize: "12px" }}>
                    {device.user}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#5f778c",
                      marginBottom: "4px",
                    }}
                  >
                    STANDORT
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "12px",
                    }}
                  >
                    <MapPin size={12} />
                    {device.location}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      fontSize: "12px",
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background:
                          device.status === "online"
                            ? "#4bd27b"
                            : "#687b8d",
                      }}
                    />

                    {device.status === "online" ? "Online" : "Offline"}
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      color: "#657d91",
                      fontSize: "10px",
                    }}
                  >
                    {device.battery}% Akku
                  </div>
                </div>

                <ChevronRight size={17} color="#579cf5" />
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "18px",
              display: "flex",
              justifyContent: "space-between",
              color: "#4e6579",
              fontSize: "10px",
            }}
          >
            <span>Device Control Center SNH · v1.0</span>

            <span>
              <BatteryMedium
                size={11}
                style={{
                  verticalAlign: "middle",
                  marginRight: "4px",
                }}
              />
              Lokale Verwaltung
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}