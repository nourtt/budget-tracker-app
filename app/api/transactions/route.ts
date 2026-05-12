export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function getUserIdFromSession() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  const user = await prisma.user.findUnique({ where: { email } });
  return user?.id ?? null;
}

export async function GET() {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { amount, type, categoryId, date, note, category } = body;

  if (amount == null || !type) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (type !== "INCOME" && type !== "EXPENSE") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  let resolvedCategoryId: string | null =
    typeof categoryId === "string" ? categoryId : null;
  if (!resolvedCategoryId && typeof category === "string" && category.trim()) {
    const cat = await prisma.category.findFirst({
      where: { userId, name: category.trim() },
    });
    resolvedCategoryId = cat?.id ?? null;
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount: Number(amount),
        type,
        categoryId: resolvedCategoryId,
        userId,
        createdAt: date ? new Date(date) : new Date(),
        note: typeof note === "string" && note.trim() ? note.trim() : null,
      },
      include: { category: true },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
