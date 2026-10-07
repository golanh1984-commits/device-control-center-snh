"use client";

import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"login" | "otp">("login");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(e: FormEvent) {
    e.preventDefault();

    setBusy(true);
    setMsg("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pw,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setBusy(false);
        setMsg(data.error || "Anmeldung fehlgeschlagen.");
        return;
      }

      setBusy(false);
      setStep("otp");
      setMsg(data.message || "Sicherheitscode wurde erzeugt.");
    } catch (error) {
      console.error(error);
      setBusy(false);
      setMsg("Verbindung zum Server fehlgeschlagen.");
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault();

    if (!/^\d{4}$/.test(code)) {
      setMsg("Bitte einen 4-stelligen Sicherheitscode eingeben.");
      return;
    }

    setBusy(true);
    setMsg("");

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const responseText = await response.text();

      let data: {
        success?: boolean;
        message?: string;
        error?: string;
      };

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("Ungültige Serverantwort:", responseText);

        setBusy(false);
        setMsg("Der Server hat keine gültige Antwort zurückgegeben.");
        return;
      }

      if (!response.ok || !data.success) {
        setBusy(false);
        setMsg(
          data.error || "Der Sicherheitscode ist falsch oder abgelaufen."
        );
        return;
      }

      setBusy(false);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Fehler bei der Codeprüfung:", error);

      setBusy(false);
      setMsg("Verbindung zum Server fehlgeschlagen.");
    }
  }

  function backToLogin() {
    setStep("login");
    setCode("");
    setMsg("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #07111f 0%, #0b1728 50%, #07111f 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        color: "#ffffff",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#0d1b2a",
          border: "1px solid #20344a",
          borderRadius: "18px",
          padding: "36px",
          boxShadow: "0 25px 70px rgba(0,0,0,0.45)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "58px",
              height: "58px",
              margin: "0 auto 18px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #1677ff, #0b5ed7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 800,
              boxShadow: "0 10px 30px rgba(22,119,255,0.25)",
            }}
          >
            SNH
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "25px",
              fontWeight: 750,
              letterSpacing: "-0.4px",
            }}
          >
            Device Control Center SNH
          </h1>

          <p
            style={{
              margin: "9px 0 0",
              color: "#8ea4ba",
              fontSize: "14px",
            }}
          >
            Geschützte interne Geräteverwaltung
          </p>
        </div>

        {step === "login" ? (
          <form onSubmit={login}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#c7d5e3",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              E-Mail-Adresse
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail-Adresse"
              required
              autoComplete="username"
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#091522",
                border: "1px solid #263d53",
                borderRadius: "10px",
                padding: "13px 14px",
                color: "#ffffff",
                outline: "none",
                fontSize: "14px",
                marginBottom: "18px",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#c7d5e3",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Passwort
            </label>

            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Passwort"
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#091522",
                border: "1px solid #263d53",
                borderRadius: "10px",
                padding: "13px 14px",
                color: "#ffffff",
                outline: "none",
                fontSize: "14px",
                marginBottom: "18px",
              }}
            />

            {msg && (
              <div
                style={{
                  background: "#13263a",
                  border: "1px solid #284963",
                  borderRadius: "10px",
                  padding: "11px 13px",
                  color: "#b9cce0",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {msg}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "10px",
                padding: "14px",
                background: busy ? "#315f91" : "#1677ff",
                color: "#ffffff",
                fontWeight: 700,
                cursor: busy ? "default" : "pointer",
                fontSize: "14px",
              }}
            >
              {busy ? "Anmelden…" : "Anmelden"}
            </button>
          </form>
        ) : (
          <form onSubmit={verify}>
            <div
              style={{
                background: "#0a1623",
                border: "1px solid #20384f",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#d9e5f0",
                  lineHeight: 1.5,
                }}
              >
                Ein 4-stelliger Sicherheitscode wurde an die hinterlegte
                E-Mail-Adresse gesendet.
              </div>
            </div>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#c7d5e3",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              4-stelliger Sicherheitscode
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="0000"
              autoFocus
              autoComplete="one-time-code"
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#091522",
                border: "1px solid #263d53",
                borderRadius: "10px",
                padding: "16px",
                color: "#ffffff",
                outline: "none",
                fontSize: "26px",
                letterSpacing: "10px",
                textAlign: "center",
                marginBottom: "18px",
              }}
            />

            {msg && (
              <div
                style={{
                  background: "#13263a",
                  border: "1px solid #284963",
                  borderRadius: "10px",
                  padding: "11px 13px",
                  color: "#b9cce0",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {msg}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "10px",
                padding: "14px",
                background: busy ? "#315f91" : "#1677ff",
                color: "#ffffff",
                fontWeight: 700,
                cursor: busy ? "default" : "pointer",
                fontSize: "14px",
              }}
            >
              {busy ? "Prüfe…" : "Dashboard öffnen"}
            </button>

            <button
              type="button"
              onClick={backToLogin}
              disabled={busy}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                color: "#8ea4ba",
                padding: "13px",
                marginTop: "8px",
                cursor: busy ? "default" : "pointer",
                fontSize: "13px",
              }}
            >
              Zurück
            </button>
          </form>
        )}
      </div>
    </main>
  );
}