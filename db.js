import pkg from 'pg';
const { Pool } = pkg;

const call_db = new Pool({
  host: 'dpg-d1pnko3ipnbc7387p380-a.oregon-postgres.render.com',
  user: 'return_fraud',
  password: 'bomwiu9Etn8O9FVQWGJTHXMxJsuqHmdj',
  database: 'return_fraud',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10
});

const querry = async (qrr, values) => {
  try {
    const { rows } = await call_db.query(qrr, values);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const close_db = async () => {
  try {
    await call_db.end();
    return { msg: "db closed successfully", ok: 1 };
  } catch (error) {
    return error;
  }
};

export { querry, close_db };
