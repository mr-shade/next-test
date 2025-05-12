import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the SQLite database
const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

// Run migrations
migrate(db, { migrationsFolder: resolve(__dirname, '../drizzle/migrations') });

console.log('Migrations completed successfully');
process.exit(0);
