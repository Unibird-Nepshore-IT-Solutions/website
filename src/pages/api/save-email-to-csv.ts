import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";

export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), {
        status: 400,
      });
    }

    const filePath = path.join(process.cwd(), "user_emails.csv");

    const timestamp = new Date().toLocaleString();
    const escapedText = `"${text.replace(/"/g, '""')}"`;
    const csvLine = `${timestamp},${escapedText}\n`;

    let fileExists = true;
    try {
      await fs.access(filePath);
    } catch {
      fileExists = false;
    }

    if (!fileExists) {
      const headers = "Timestamp,Emails\n";
      await fs.writeFile(filePath, headers + csvLine);
    } else {
      await fs.appendFile(filePath, csvLine);
    }

    return new Response(JSON.stringify({ message: "Saved successfully" }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
