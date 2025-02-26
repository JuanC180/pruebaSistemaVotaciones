import dotenv from 'dotenv';
import express, { application } from 'express';
import db_sequelize from './config/db.js';
import swaggerUI from "swagger-ui-express";
import specs from '../swagger/swagger.js';
import cors from 'cors';


import votersRoutes from './routes/votersRoutes.js';
import candidatesRoutes from './routes/candidatesRoutes.js';
import votesRoutes from './routes/votesRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express()
dotenv.config({ path: '../.env' })
app.use(express.json())
app.use(cors())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))


const PORT = process.env.PORT || 3000;


async function connectDB() {
  try {
    await db_sequelize.authenticate()
    db_sequelize.sync({ alter: true })
    console.log('Conexion exitosa en la bd')
  } catch (error) {
    console.log(error)
    console.log('Hubo un error en la base de datos')
  }
}

connectDB()

const path = {
  voters: '/api/voters',
  candidates: '/api/candidates',
  votes: '/api/votes',
  usuarios: '/api/users',
  auth: '/api/auth'
}

app.use(path.voters, votersRoutes);
app.use(path.candidates, candidatesRoutes);
app.use(path.votes, votesRoutes);
app.use(path.usuarios, usuariosRoutes);
app.use(path.auth, authRoutes)


app.get('/', (req, res) => {
  res.send("desde get index")
})

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
})


app.listen(PORT, async () => {
  console.log(`Corriendo por el puerto: ${process.env.PORT}`)
})
