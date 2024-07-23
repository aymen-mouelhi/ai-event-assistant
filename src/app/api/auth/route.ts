import { NextResponse } from "next/server";
import { supabase } from "../../../utils/supabaseClient";

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json();

    if (type === "logout") {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json(
        { message: "Logged out successfully!" },
        { status: 200 }
      );
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const response = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
      },
    });

    if (response?.error) {
      return NextResponse.json(
        { error: response.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Check your email for the login link!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
