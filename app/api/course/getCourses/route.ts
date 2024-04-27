import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {

    if(req.method !== "GET") {
      return new NextResponse("Method not allowed", { status: 405 })
    }

    const session = await auth()
    const user = session?.user
    
    if(!user?.email || !user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const courses = await prisma.course.findMany({
      where: {
        publisherId: user.id
      },
      orderBy: {
        name: "asc"
      }
    })
    
    return NextResponse.json(courses);

  
  } catch (error) {
    return new NextResponse("Server error" , { status: 500 })
  }
}