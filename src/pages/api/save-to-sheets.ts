// src/pages/api/save-to-sheets.ts
import type { APIRoute } from "astro";
import { google } from "googleapis";

const SHEET_ID = import.meta.env.PUBLIC_GOOGLE_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log("API route reached");

  try {
    const body = await request.json();
    const { text, type, countryCode } = body;

    console.log("Received data:", { text, type, countryCode });

    if (!text || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    // Initialize Google Sheets API with Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Prepare data
    const timestamp = new Date().toISOString();
    const values = [[timestamp, type, text, countryCode || ""]];

    // Append to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: values,
      },
    });

    console.log("Google Sheets response:", response.data);

    return new Response(JSON.stringify({ message: "Saved successfully" }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    console.error("Error details:", error.message);

    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
        details: error.response?.data || null,
      }),
      { status: 500 },
    );
  }
};
