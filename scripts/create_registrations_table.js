const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

(async () => {
  const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log('Connected to database');

    // Try to create pgcrypto for gen_random_uuid()
    try {
      await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
      console.log('Ensured extension pgcrypto');
    } catch (e) {
      console.warn('Could not create pgcrypto extension:', e.message || e);
    }

    const createTableSql = `
      CREATE TABLE IF NOT EXISTS registrations (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        email text NOT NULL UNIQUE,
        phone text NOT NULL,
        created_at timestamp NOT NULL DEFAULT now()
      );
    `;

    await client.query(createTableSql);
    console.log('Ensured table registrations');
    process.exit(0);
  } catch (err) {
    console.error('Error creating table:', err);
    process.exit(1);
  } finally {
    try { await client.end(); } catch {};
  }
})();
