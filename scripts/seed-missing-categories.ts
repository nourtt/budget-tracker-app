import { prisma } from "../lib/prisma";

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
  "Salary",
  "Gifts",
  "Investment",
];

async function main() {
  const users = await prisma.user.findMany({
    include: { categories: true },
  });

  for (const user of users) {
    // Skip users who already have categories
    if (user.categories.length > 0) continue;

    await prisma.category.createMany({
      data: DEFAULT_CATEGORIES.map((name) => ({
        name,
        userId: user.id,
      })),
    });

    console.log(`Seeded categories for user: ${user.email}`);
  }
}

main()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
