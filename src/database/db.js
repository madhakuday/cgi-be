let Sequelize = require('sequelize');

let databaseName = process.env.DB_NAME;
let dbUser = process.env.DB_USER;
let dbPass = process.env.DB_PASSWORD;
let dbHost = process.env.DB_HOST;

if (process.env.TESTING === 'testing') {
  databaseName = 'cgi';
  dbUser = 'root';
  dbPass = '';
  dbHost = 'localhost';
}

const sequelize = new Sequelize(databaseName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql',
  ssl: 'Amazon RDS',
  port: 35876,
  logging: console.log,
  query: { raw: true },

  pool: { maxConnections: 5, maxIdleTime: 30 },

  timezone: '+05:30',
});

// Listen for the 'dialect' event to log host and port information
sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Connected to MySQL server at ${sequelize.config.host}:${sequelize.config.port}`
    );
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

module.exports = sequelize;
