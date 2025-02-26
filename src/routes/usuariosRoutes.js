import express from 'express';

import {
  usuariosGet,
} from '../controllers/usuariosControllers.js'


const router = express.Router();


router.get('/', usuariosGet);



export default router;