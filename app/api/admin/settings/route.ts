import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteSettingsPayloadSchema } from "@/lib/site-settings-schema";
import { getSiteSettingsPayload } from "@/lib/site-settings";

export async function GET() {
  const data = await getSiteSettingsPayload();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = siteSettingsPayloadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed", issues: result.error.flatten() }, { status: 400 });
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, data: JSON.stringify(result.data) },
    update: { data: JSON.stringify(result.data) },
  });

  return NextResponse.json({ ok: true });
}
