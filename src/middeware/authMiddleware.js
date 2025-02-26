import jwt from 'jsonwebtoken';
import  Users  from '../models/usuariosModels.js';
import dotenv from 'dotenv';

dotenv.config();

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      try {
        const usuario = await Users.findByPk(user.userId);
        if (!usuario) {
          return res.sendStatus(403);
        }
        req.user = usuario;
        next();
      } catch (error) {
        return res.sendStatus(500); // Internal Server Error
      }
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

export {
  authenticateJWT
};