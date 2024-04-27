import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  
  try {
    const session = await auth();
    const user = session?.user;
    const body = await req.json()

    const { id } = body


    if(!user?.email || !user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const deletedCourse = await prisma.course.delete({
      where: {
        id
      }
    })

    return NextResponse.json({message: "Success!"})

  } catch (error) {
    return new NextResponse("Server error" , { status: 500 })
  }
}