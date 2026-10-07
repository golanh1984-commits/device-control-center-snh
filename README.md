# Device Control Center SNH

Lokale Next.js-Geräteverwaltungsoberfläche mit Login, 4-stelligem OTP, Geräteinventar, Standortabfrage und Karte.

## Wichtig
Die Standortdaten in dieser Anwendung sind fest definierte interne Verwaltungs-/Testdaten. Es findet keine echte Ortung fremder Geräte, keine echte SIM-Sperre und keine heimliche Gerätefernsteuerung statt.

## Start
1. Node.js 20.12+ installieren.
2. `npm install`
3. `.env.example` nach `.env.local` kopieren.
4. Zugangsdaten und optional SMTP eintragen.
5. `npm run dev`
6. `http://localhost:3000` öffnen.

## OTP per iCloud
Für iCloud SMTP brauchst du ein Apple app-spezifisches Passwort. Das normale Apple-ID-Passwort nicht als SMTP-Passwort verwenden.

SMTP_HOST=smtp.mail.me.com
SMTP_PORT=587
SMTP_USER=deine-adresse@icloud.com
SMTP_PASS=APP-SPEZIFISCHES-PASSWORT
SMTP_FROM=Device Control Center SNH <deine-adresse@icloud.com>

Wenn SMTP nicht konfiguriert ist, wird der OTP nur im Terminal ausgegeben.
