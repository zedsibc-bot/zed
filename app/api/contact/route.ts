export const runtime = "nodejs";

const REQUIRED_FIELDS = ["Fullname", "Contact Number"];

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

  const itemCount = Math.max(
    formData.getAll("Item Number").length,
    formData.getAll("Brand / Model").length,
    formData.getAll("Description").length,
    formData.getAll("Quantity").length,
    formData.getAll("Unit").length,
    1
  );

  const items = Array.from({ length: itemCount }, (_, i) => ({
    itemNumber: String(formData.getAll("Item Number")[i] ?? "").trim(),
    brandModel: String(formData.getAll("Brand / Model")[i] ?? "").trim(),
    description: String(formData.getAll("Description")[i] ?? "").trim(),
    quantity: String(formData.getAll("Quantity")[i] ?? "").trim(),
    unit: String(formData.getAll("Unit")[i] ?? "").trim(),
  }));

  for (let i = 0; i < items.length; i++) {
    if (!items[i].description || !items[i].quantity || Number(items[i].quantity) < 1) {
      return Response.json(
        {
          error: `Item ${i + 1} needs a description and a quantity of at least 1.`,
        },
        { status: 400 }
      );
    }
  }

  const params = new URLSearchParams();
  for (const key of ["Fullname", "Company Name", "Address", "Contact Number", "TIN Number"]) {
    if (payload[key]) params.append(key, payload[key]);
  }
  for (const item of items) {
    params.append("Item Number", item.itemNumber);
    params.append("Brand / Model", item.brandModel);
    params.append("Description", item.description);
    params.append("Quantity", item.quantity);
    params.append("Unit", item.unit);
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    return Response.json(
      { error: "Failed to save submission." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
