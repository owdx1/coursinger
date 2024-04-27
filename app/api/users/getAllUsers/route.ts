import prisma from "@/app/lib/db";
import { usersArrayType } from "@/app/types";
import { NextResponse } from "next/server";

export async function POST(){

  try {
    const allUsers: usersArrayType = await prisma.user.findMany();

    if(!allUsers) {
      return new NextResponse("Something went wrong", { status: 400 })
    }
    return NextResponse.json(allUsers)

  } catch (error) {
    return new NextResponse("Server error" , { status: 500 })
  }
}