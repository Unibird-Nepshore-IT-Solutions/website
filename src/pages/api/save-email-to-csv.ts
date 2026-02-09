// src/pages/api/save-to-sheets.ts
import type { APIRoute } from "astro";

// Get from environment variables
const SHEET_ID = import.meta.env.PUBLIC_GOOGLE_SHEET_ID;
const API_KEY = import.meta.env.GOOGLE_SHEETS_API_KEY;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { text, type, countryCode } = body;

    if (!text || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const range = "Sheet1!A:D";
    const values = [[timestamp, type, text, countryCode || ""]];

    // Append to Google Sheets
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: values,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Google Sheets Error:", error);
      throw new Error("Failed to save to Google Sheets");
    }

    return new Response(JSON.stringify({ message: "Saved successfully" }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500 },
    );
  }
};
