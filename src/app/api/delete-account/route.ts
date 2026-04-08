import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    if (!supabaseServiceKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data: deletionRequest, error: requestError } = await supabaseAdmin
      .from("deletion_requests")
      .select("user_id")
      .eq("token", token)
      .eq("confirmed", false)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (requestError || !deletionRequest) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const userId = deletionRequest.user_id;

    await supabaseAdmin.from("user_progress").delete().eq("user_id", userId);
    await supabaseAdmin.from("profiles").delete().eq("id", userId);
    await supabaseAdmin.from("deletion_requests").delete().eq("token", token);

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error("Error deleting user:", deleteError);
      return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}