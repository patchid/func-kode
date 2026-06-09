import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import crypto from "crypto";

type ProfileRecord = {
  id: string;
  github_username: string;
  display_name: string;
  bio: string;
  skills: string;
  role_preference: string;
  interests: string;
  avatar_url: string | null;
  is_onboarded: boolean;
};

function buildDefaultProfile(user: {
  id: string;
  user_metadata?: Record<string, unknown>;
}): ProfileRecord {
  const githubUsername =
    (user.user_metadata?.user_name as string | undefined) ||
    (user.user_metadata?.preferred_username as string | undefined) ||
    "newuser";
  const displayName =
    (user.user_metadata?.name as string | undefined) || githubUsername || "New User";
  const avatarUrl = (user.user_metadata?.avatar_url as string | undefined) || null;

  return {
    id: user.id,
    github_username: githubUsername,
    display_name: displayName,
    bio: "",
    skills: "",
    role_preference: "",
    interests: "",
    avatar_url: avatarUrl,
    is_onboarded: false,
  };
}

function createServiceRoleJwt(secret: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: "supabase",
      role: "service_role",
      iat: now,
      exp: now + 60 * 60,
    })
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${signature}`;
}

function getAdminHeaders(jwtSecret: string) {
  const serviceJwt = createServiceRoleJwt(jwtSecret);
  return {
    apikey: serviceJwt,
    Authorization: `Bearer ${serviceJwt}`,
    "Content-Type": "application/json",
  };
}

async function getProfileById(baseUrl: string, jwtSecret: string, id: string) {
  const response = await fetch(
    `${baseUrl}/rest/v1/profiles?id=eq.${id}&select=*`,
    {
      method: "GET",
      headers: getAdminHeaders(jwtSecret),
      cache: "no-store",
    }
  );
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.message || body?.error || response.statusText;
    throw new Error(message);
  }
  return Array.isArray(body) && body.length > 0 ? (body[0] as Partial<ProfileRecord>) : null;
}

async function upsertProfile(baseUrl: string, jwtSecret: string, payload: ProfileRecord) {
  const response = await fetch(`${baseUrl}/rest/v1/profiles`, {
    method: "POST",
    headers: {
      ...getAdminHeaders(jwtSecret),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([payload]),
    cache: "no-store",
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.message || body?.error || response.statusText;
    throw new Error(message);
  }
  return Array.isArray(body) && body.length > 0 ? (body[0] as ProfileRecord) : payload;
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!supabaseUrl || !jwtSecret) {
      return NextResponse.json({ error: "Missing Supabase server configuration" }, { status: 500 });
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingProfile = await getProfileById(supabaseUrl, jwtSecret, user.id);

    const defaults = buildDefaultProfile(user);
    const mergedProfile: ProfileRecord = {
      ...defaults,
      ...(existingProfile ?? {}),
      avatar_url: (existingProfile?.avatar_url as string | null | undefined) ?? defaults.avatar_url,
      is_onboarded: Boolean(existingProfile?.is_onboarded ?? defaults.is_onboarded),
    };

    const saved = await upsertProfile(supabaseUrl, jwtSecret, mergedProfile);
    return NextResponse.json({ profile: saved });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!supabaseUrl || !jwtSecret) {
      return NextResponse.json({ error: "Missing Supabase server configuration" }, { status: 500 });
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as Partial<ProfileRecord>;
    const defaults = buildDefaultProfile(user);

    const payload: ProfileRecord = {
      id: user.id,
      github_username: (body.github_username || defaults.github_username).trim(),
      display_name: (body.display_name || defaults.display_name).trim(),
      bio: (body.bio || "").trim(),
      skills: (body.skills || "").trim(),
      role_preference: (body.role_preference || "").trim(),
      interests: (body.interests || "").trim(),
      avatar_url: body.avatar_url ?? defaults.avatar_url,
      is_onboarded: true,
    };

    const saved = await upsertProfile(supabaseUrl, jwtSecret, payload);
    return NextResponse.json({ id: saved.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
