export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  await prisma.category.createMany({
    data: [
      { name: "Food", userId: user.id },
      { name: "Transport", userId: user.id },
      { name: "Housing", userId: user.id },
      { name: "Utilities", userId: user.id },
      { name: "Entertainment", userId: user.id },
      { name: "Shopping", userId: user.id },
      { name: "Health", userId: user.id },
      { name: "Other", userId: user.id },
      { name: "Salary", userId: user.id },
      { name: "Gifts", userId: user.id },
      { name: "Investment", userId: user.id },
    ],
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
