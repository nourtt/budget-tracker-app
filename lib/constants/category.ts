/** Shown when transaction type is Income */
export const incomeCategoryList = ["Salary", "Gifts", "Investment"] as const;

/** Shown when transaction type is Expense */
export const expenseCategoryList = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
] as const;

/** All category names (e.g. history, APIs) */
export const categoryList = [
  ...expenseCategoryList,
  ...incomeCategoryList,
] as const;
