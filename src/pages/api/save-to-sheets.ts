// src/pages/api/save-to-sheets.ts
import type { APIRoute } from "astro";
import { google } from "googleapis";

const SHEET_ID = import.meta.env.PUBLIC_GOOGLE_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;

// Decode Base64 private key
const PRIVATE_KEY_BASE64 = import.meta.env
  .GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_BASE64;
const PRIVATE_KEY = PRIVATE_KEY_BASE64
  ? Buffer.from(PRIVATE_KEY_BASE64, "base64").toString("utf-8")
  : "";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // ✅ Read body ONCE
    const body = await request.json();
    const { text, type, countryCode } = body;

    console.log("Received data:", body); // ✅ Log after reading

    if (!text || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toISOString();
    const values = [[timestamp, type, text, countryCode || ""]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    return new Response(JSON.stringify({ message: "Saved successfully" }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("API Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
