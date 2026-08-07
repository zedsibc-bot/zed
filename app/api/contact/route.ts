export const runtime = "nodejs";

const REQUIRED_FIELDS = ["Fullname", "Contact Number", "Description"];

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { error: "Form submission is not configured." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const payload: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") payload[key] = value.trim();
  });

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field]) {
      return Response.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload).toString(),
  });

  if (!res.ok) {
    return Response.json(
      { error: "Failed to save submission." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
