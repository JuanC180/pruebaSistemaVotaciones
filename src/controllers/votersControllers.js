import Voters from '../models/votersModels.js';

const votersGet = async (req, res) => {
  try {
    const voter = await Voters.findAll();
    res.json(voter);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los votantes' });
  }
};

const votersPost = async (req, res) => {
  const { name, email, has_voted } = req.body;
  try {
    const voter = await Voters.create({ name, email, has_voted });
    res.json(voter);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el votante' });
  }
};

const votersGetById = async (req, res) => {
  const { id } = req.params;
  try {
    const votante = await Voters.findOne({ where: { id } });
    if (votante) {
      res.json(votante);
    } else {
      res.status(404).json({ error: 'Votante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el votante' });
  }
};

const votersPut = async (req, res) => {
  const { id } = req.params;
  const { name, email, has_voted } = req.body;
  try {
    const voter = await Voters.findByPk(id);
    if (voter) {
      await voter.update({ name, email, has_voted });
      res.json(voter);
    } else {
      res.status(404).json({ error: 'Error al actualizar votante' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el votante' });
  }
};

const votersDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const voter = await Voters.findByPk(id);
    if (voter) {
      await voter.destroy();
      res.json({ message: 'Votante eliminado' });
    } else {
      res.status(404).json({ error: 'Error al eliminar votante' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el votante' });
  }
};

export { votersGet, votersPost, votersGetById, votersPut, votersDelete };