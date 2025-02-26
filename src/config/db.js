
//import mysql from 'mysql2';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({ path: '../.env'})

const db_sequelize = new Sequelize(process.env.DATABASE_DB,
    process.env.USER_DB,
    process.env.PASSWORD_DB, {
      host: process.env.HOST_DB,
      dialect: 'mysql'
    }
  );



// const connection = await mysql.createConnection({
//   host: process.env.HOST_DB,
//   user: process.env.USER_DB,
//   password: process.env.PASSWORD_DB,
//   database: process.env.DATABASE_DB,
// });



export default db_sequelize;
