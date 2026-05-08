import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { amount, type, categoryId, userId, date, note } = await request.json();

  if (!amount || !type || !userId) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }
  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        categoryId,
        userId,
        createdAt: date ? new Date(date) : new Date(),
        note,
      },
    });

    return new Response(JSON.stringify(transaction), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
