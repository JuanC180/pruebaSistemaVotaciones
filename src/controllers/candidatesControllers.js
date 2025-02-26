
import Candidates from "../models/candidatesModels.js"


const candidatesGet = async (req, res) => {
  try {
    const candidates = await Candidates.findAll()
    res.json(candidates)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los candidatos" });
  }
}

const candidatesGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidates.findOne({ where: {id:id} });
    if(candidate){
      res.json(candidate)
    }else{
      res.status(404).json({ error: "Candidato no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el candidato" });
  }
}

const candidatesPost = async (req, res) => {
  const { name, party, votes } = req.body;
  try {
    const candidate = await Candidates.create({ name, party, votes });
    res.json(candidate)
  } catch (error) {
    res.status(500).json({ error: "Error al crear el candidato" });
  }
}

const candidatesDelete = async (req, res) => {
  const {id} = req.params;
  try {
    const candidate = await Candidates.findByPk(id)
    if(candidate){
      await candidate.destroy();
      res.json({ message: "Candidato Eliminado" })
    }
    else{
      res.status(404).json({ error: "Error al eliminar candidato"})
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el candidato" });
  }
}

export {
  candidatesGet,
  candidatesGetById,
  candidatesPost,
  candidatesDelete
}