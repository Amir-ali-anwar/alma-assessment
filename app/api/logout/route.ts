import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the token cookie (adjust cookie name and options if needed)
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true, // if your token cookie is httpOnly
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
