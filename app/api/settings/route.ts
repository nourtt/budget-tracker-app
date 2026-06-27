import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";

async function getUserIdFromSession() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  const user = await prisma.user.findUnique({ where: { email } });
  return user?.id ?? null;
}

export async function PUT(request: Request) {
  const { username, password } = await request.json();
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    if (username) {
      await prisma.user.update({
        where: { id: userId },
        data: { username },
      });
    }
    if (password) {
      await prisma.user.update({
        where: { id: userId },
        data: { password: await bcrypt.hash(password, 10) },
      });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
