import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

let currentOtp = '';
let otpExpiresAt = 0;

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function validateOtp(code: string) {
  if (!currentOtp || Date.now() > otpExpiresAt) {
    return false;
  }

  if (code !== currentOtp) {
    return false;
  }

  currentOtp = '';
  otpExpiresAt = 0;

  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? '').trim();
    const password = String(body.password ?? '');

    const expectedEmail = process.env.LOGIN_EMAIL;
    const expectedPassword = process.env.LOGIN_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      console.error(
        '[SNH] LOGIN_EMAIL oder LOGIN_PASSWORD ist in der Server-Umgebung nicht gesetzt.'
      );

      return NextResponse.json(
        {
          success: false,
          error: 'Die Login-Konfiguration ist auf dem Server nicht vollständig eingerichtet.',
        },
        { status: 500 }
      );
    }

    if (email !== expectedEmail || password !== expectedPassword) {
      return NextResponse.json(
        {
          success: false,
          error: 'E-Mail oder Passwort ist falsch.',
        },
        { status: 401 }
      );
    }

    const otp = generateOtp();

    currentOtp = otp;
    otpExpiresAt = Date.now() + 5 * 60 * 1000;

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpFrom = process.env.SMTP_FROM || expectedEmail;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: expectedEmail,
        subject: 'SNH Sicherheitscode',
        text: `Dein Sicherheitscode lautet: ${otp}\n\nDer Code ist 5 Minuten gültig.`,
      });

      console.log('[SNH] Sicherheitscode wurde per E-Mail versendet.');
    } else {
      console.log(`[SNH] Sicherheitscode für ${expectedEmail}: ${otp}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Sicherheitscode wurde erstellt.',
    });
  } catch (error) {
    console.error('[SNH] Fehler beim Login:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Beim Login ist ein Fehler aufgetreten.',
      },
      { status: 500 }
    );
  }
}