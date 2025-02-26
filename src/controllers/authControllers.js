import  User  from '../models/usuariosModels.js';
import { generateHashedPassword, comparePasswords, generateJWT } from '../helpers/auth.js';

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await generateHashedPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Usuario creado con éxito', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = generateJWT(user);

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user;
    res.json({ message: 'Perfil del usuario', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
  }
};

export {
  register,
  login,
  profile
};