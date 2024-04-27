import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "./app/lib/db"
import { Adapter } from "next-auth/adapters"


export const { handlers, signIn, signOut, auth} = NextAuth({
  trustHost: true,
  providers: [Google],
  adapter: PrismaAdapter(prisma) as Adapter
})