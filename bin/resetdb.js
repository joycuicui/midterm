// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const db = require('../db/connection');

// PG connection setup
// const connectionString = process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));

  try {
    const schemaDir = './db/schema';
    const schemaFilenames = fs.readdirSync(schemaDir);

    console.log(chalk.yellow('Found files:'), schemaFilenames);

    /*const schemaFilenames = fs.readdirSync('./db/schema');*/

  for (const fn of schemaFilenames) {
    const filePath = `${schemaDir}/${fn}`;
    /*const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');*/
    const sql = fs.readFileSync(filePath, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    console.log(chalk.yellow('File content:'), sql); /*for file logging*/
    await db.query(sql);
  }
}
catch (err) {
  console.error(chalk.red(`Failed due to error: ${err}`));
  process.exit();
}
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runMigrationFiles = async () => {
  console.log(chalk.cyan(`-> Running Migration Files ...`));
  const migrationFilenames = fs.readdirSync('./db/migrations');

  for (const fn of migrationFilenames) {
    const sql = fs.readFileSync(`./db/migrations/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    await runSeedFiles();
    await runMigrationFiles();
    process.exit();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit();
  }
};

runResetDB();
