import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

declare global {
  var snhOtp: string | undefined;
  var snhOtpExpires: number | undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");

    const expectedEmail = process.env.LOGIN_EMAIL;
    const expectedPassword = process.env.LOGIN_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      return NextResponse.json(
        {
          success: false,
          error:
            "LOGIN_EMAIL und LOGIN_PASSWORD fehlen in .env.local.",
        },
        { status: 500 }
      );
    }

    if (email !== expectedEmail || password !== expectedPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "E-Mail-Adresse oder Passwort ist falsch.",
        },
        { status: 401 }
      );
    }

    // 4-stelligen Sicherheitscode erzeugen
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Sicherheitscode speichern
    globalThis.snhOtp = otp;
    globalThis.snhOtpExpires = Date.now() + 5 * 60 * 1000;

    // Sicherheitscode im Terminal anzeigen
    console.log("");
    console.log("========================================");
    console.log("[SNH] SICHERHEITSCODE");
    console.log(`[SNH] E-Mail: ${expectedEmail}`);
    console.log(`[SNH] CODE: ${otp}`);
    console.log("[SNH] Gültig: 5 Minuten");
    console.log("========================================");
    console.log("");

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    // Wenn SMTP eingerichtet ist, zusätzlich E-Mail senden
    if (host && user && pass && from) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port: Number(process.env.SMTP_PORT || 587),
          secure: false,
          auth: {
            user,
            pass,
          },
        });

        await transporter.sendMail({
          from,
          to: expectedEmail,
          subject: "Ihr Sicherheitscode – Device Control Center SNH",
          text: `Ihr Sicherheitscode lautet: ${otp}. Der Code ist 5 Minuten gültig.`,
        });

        return NextResponse.json({
          success: true,
          message: "Sicherheitscode wurde per E-Mail versendet.",
        });
      } catch (error) {
        console.error("[SNH] SMTP-Fehler:", error);

        return NextResponse.json({
          success: true,
          message:
            "Sicherheitscode wurde erzeugt. Der Code steht im Terminal.",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Sicherheitscode wurde erzeugt. Der Code steht im Terminal.",
    });
  } catch (error) {
    console.error("[SNH] Fehler beim Login:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Fehler bei der Anmeldung.",
      },
      { status: 500 }
    );
  }
}

export function validateOtp(code: string) {
  const savedCode = globalThis.snhOtp;
  const expires = globalThis.snhOtpExpires;

  if (!savedCode || !expires) {
    return false;
  }

  if (Date.now() > expires) {
    globalThis.snhOtp = undefined;
    globalThis.snhOtpExpires = undefined;
    return false;
  }

  if (code !== savedCode) {
    return false;
  }

  // Code nach erfolgreicher Anmeldung löschen
  globalThis.snhOtp = undefined;
  globalThis.snhOtpExpires = undefined;

  return true;
}