import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email }= body;

    const session = await auth();
    const user = session?.user;

    console.log("sende session ne?", session);

    if(!user?.id || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if(!name) {
      return new NextResponse("Invalid credentials", { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        name: name
      }
    })

    return NextResponse.json(updatedUser);



  } catch (error) {
    return new NextResponse("Server error", { status: 500 })
  }
}