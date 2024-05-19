import { accounts, categories, transactions } from '@/db/schema';
import { neon } from '@neondatabase/serverless';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: 'env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = process.env.SEED_USER_ID!;
const SEED_CATEGORIES: (typeof categories.$inferInsert)[] = [
  { id: 'category_1', name: 'Food', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_2', name: 'Rent', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_3', name: 'Utilities', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_7', name: 'Clothing', userId: SEED_USER_ID, plaidId: null },
];

const SEED_ACCOUNTS: (typeof accounts.$inferInsert)[] = [
  { id: 'account_1', name: 'Checking', userId: SEED_USER_ID, plaidId: null },
  { id: 'account_2', name: 'Saving', userId: SEED_USER_ID, plaidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferInsert)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case 'Rent':
      return Math.floor(Math.random() * 40000 + 90);
    case 'Utilities':
      return Math.floor(Math.random() * 20000 + 50);
    case 'Food':
      return Math.floor(Math.random() * 3000 + 10);
    case 'Health':
      return Math.floor(Math.random() * 5000 + 15);
    case 'Entertainment':
    case 'Clothing':
    case 'Miscellaneous':
      return Math.floor(Math.random() * 10000 + 20);
    default:
      return Math.floor(Math.random() * 5000 + 10);
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1; // 1 ~ 4 transactions per day
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6; // 60% chance of being an expense
    const amount = generateRandomAmount(category);
    const formattedAmount = isExpense ? -amount : amount;
    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, 'yyyy-MM-dd')}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: 'Merchant',
      notes: 'Random transaction',
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(SEED_CATEGORIES);
    await db.insert(accounts).values(SEED_ACCOUNTS);
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.error('Error during seed', error);
    process.exit(1);
  }
};

main();
