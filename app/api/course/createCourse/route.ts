import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  try {
    const body = await req.json();
    const {isPublic, name, code, description, password } = body;

    const session = await auth();

    const user = session?.user;

    if(!user?.email || !user.id) {
      return new NextResponse("Unauthorized" , { status: 401 })
    }

    if(user.role !== "admin") {
      return new NextResponse("Unauthorized" , { status: 401 })
    }
    if(isPublic && password) {
      return new NextResponse("Invalid credentials", { status: 400 })
    }
    if(!isPublic && !password) {
      return new NextResponse("Invalid credentials", { status: 400 })

    }
    
    const createdCourse = await prisma.course.create({
      data: {
        name: name,
        code: code,
        description: description,
        password: password,
        public: isPublic,
        publisherId: user.id
      }
    })

    return NextResponse.json(createdCourse)
    
  } catch (error) {
    return new NextResponse("Server error" , { status: 500 })
  }
} 