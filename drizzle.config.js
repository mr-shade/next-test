export default {
  schema: './src/db/schema',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
};
