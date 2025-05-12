import { drizzle } from 'drizzle-orm/d1';
import { drizzle as drizzleSQLite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Local SQLite database for development
let localDb = null;

// This function creates a Drizzle client for either Cloudflare D1 or local SQLite
export function createClient(env) {
  // Check if we're in a Cloudflare environment
  if (env && env.DB) {
    return drizzle(env.DB, { schema });
  }

  // For local development, use SQLite
  if (!localDb) {
    try {
      const sqlite = new Database('sqlite.db');
      localDb = drizzleSQLite(sqlite, { schema });
    } catch (error) {
      console.error('Failed to connect to local SQLite database:', error);
      throw new Error('Database connection failed');
    }
  }

  return localDb;
}

// Helper function to generate a unique ID
export function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
