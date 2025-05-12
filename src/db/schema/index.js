import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Define the todos table
export const todos = sqliteTable('todos', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  completed: integer('completed').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
