#!/bin/zsh
cd "$(dirname "$0")"
if [ ! -d node_modules ]; then
  echo "Installiere Abhängigkeiten…"
  npm install
fi
npm run dev > snh-dev.log 2>&1 &
PID=$!
echo "Device Control Center SNH läuft. PID: $PID"
sleep 4
open "http://localhost:3000"
wait $PID
