import { NextResponse } from "next/server";
import { validateOtp } from "../login/route";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const code = String(body.code ?? "").trim();

    console.log("[SNH] Sicherheitscode wird geprüft:", code);

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Bitte Sicherheitscode eingeben.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{4}$/.test(code)) {
      return NextResponse.json(
        {
          success: false,
          error: "Der Sicherheitscode muss aus 4 Ziffern bestehen.",
        },
        { status: 400 }
      );
    }

    const valid = validateOtp(code);

    if (!valid) {
      console.log("[SNH] Sicherheitscode ungültig oder abgelaufen.");

      return NextResponse.json(
        {
          success: false,
          error: "Der Sicherheitscode ist falsch oder abgelaufen.",
        },
        { status: 401 }
      );
    }

    console.log("[SNH] Sicherheitscode korrekt.");
    console.log("[SNH] Anmeldung erfolgreich.");

    const response = NextResponse.json({
      success: true,
      message: "Anmeldung erfolgreich.",
    });

    response.cookies.set("snh_session", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("[SNH] Fehler bei der Codeprüfung:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Fehler bei der Codeprüfung.",
      },
      { status: 500 }
    );
  }
}