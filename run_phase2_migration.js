const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres:mariam1994ahmed%40@db.qakmysxsmleoemwqmyny.supabase.co:5432/postgres'
  });

  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");
    
    let sql = fs.readFileSync('./supabase/phase2_migration.sql', 'utf8');
    
    console.log("Executing phase2_migration.sql...");
    await client.query(sql);
    console.log("✅ Phase 2 Schema executed successfully!");
    
  } catch (err) {
    console.error("❌ Error executing schema:", err);
  } finally {
    await client.end();
  }
}

run();
