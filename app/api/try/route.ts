import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

  try {
    const session = await auth();

    const user = session?.user;

    if(!user?.id) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    }

    return NextResponse.json({message: "hi"})
  } catch (error) {
    return new NextResponse("Server error", { status: 500 })
  }
  
}