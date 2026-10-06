import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const waitlistSchema = z.object({
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email(),
  role: z.enum(["candidate", "recruiter"]).optional(),
});

async function getBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();

  return Object.fromEntries(formData.entries());
}

export async function POST(request: NextRequest) {
  const body = await getBody(request);
  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email and role." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: true,
        mode: "preview",
        message: "Waitlist payload accepted locally. Configure Supabase to persist it.",
      },
      { status: 202 },
    );
  }

  const { error } = await supabase.from("waitlist").insert({
    company: parsed.data.company || null,
    email: parsed.data.email,
    role: parsed.data.role ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
