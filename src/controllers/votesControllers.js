
// import Candidates from "../models/candidatesModels.js";
// import Voters from "../models/votersModels.js";
// import Votes from "../models/votesModels.js"



// const votesGet = async (req, res) => {
//   try {
//     const voters = await Voters.findAll()
//     res.status(200).json(voters);

//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

// const votesPost = async (req, res) => {
//   try {
//     const { voter_id, candidate_id } = req.body;

//     const voter = await Voters.findByPk(voter_id);

//     if (!voter) {
//       return res.status(404).json({ error: 'Votante no encontrado' });

//     }
//     if (voter.has_voted) {
//       return res.status(400).json({ error: 'Votante ya ha votado' });
//     }

//     const voto = await Votes.create({ voter_id, candidate_id });
//     voter.has_voted = true;
//     await voter.save()

//     // llevar la cuenta de los votso
//     const candidate = await Candidates.findByPk(candidate_id);
//     if (candidate) {
//       candidate.votes = candidate.votes + 1;
//       await candidate.save();
//     }

//     res.status(201).json(voter)

//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

// const votesStatitisGet = async (req, res) => {
//   try {
//     const candidates = await Candidates.findAll();
//     const results = candidates.map(candidate => ({
//       id: candidate.id,
//       name: candidate.name,
//       votes: candidate.votes,
//     }));
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }





// export {
//   votesGet,
//   votesStatitisGet,
//   votesPost
// }




























// votesController.js

// controllers/votesControllers.js

//

//funciona 1






import Candidates from '../models/candidatesModels.js';
import Voters from '../models/votersModels.js';
import Votes from '../models/votesModels.js';

const votesGet = async (req, res) => {
  try {
    const votes = await Votes.findAll({
      include: [
        { model: Voters, attributes: ['name', 'email'] },
        { model: Candidates, attributes: ['name', 'party'] },
      ],
    });
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const votesPost = async (req, res) => {
  try {
    const { voter_id, candidate_id } = req.body;

    // Verificar si el votante existe
    const voter = await Voters.findByPk(voter_id);
    if (!voter) {
      return res.status(404).json({ error: 'Votante no encontrado' });
    }

    // Verificar si el votante ya ha votado
    const updatedVoter = await Voters.findByPk(voter_id);
    if (updatedVoter && updatedVoter.has_voted) {
      return res.status(400).json({ error: 'Votante ya ha votado' });
    }

    // Verificar si el candidato existe
    const candidate = await Candidates.findByPk(candidate_id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidato no encontrado' });
    }

    // Verificar si el votante y el candidato son la misma persona
    if (voter.id === candidate.id) {
      return res.status(400).json({ error: 'Un votante no puede ser candidato y viceversa' });
    }

    // Registrar el voto
    await Votes.create({ voter_id, candidate_id });

    // Actualizar el estado del votante a "ha votado"
    await Voters.update({ has_voted: true }, { where: { id: voter_id } });

    // Incrementar el conteo de votos del candidato
    await Candidates.increment({ votes: 1 }, { where: { id: candidate_id } });

    res.status(201).json({ message: 'Voto registrado con éxito' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const votesStatitisGet = async (req, res) => {
  try {
    const candidates = await Candidates.findAll();
    const totalVoters = await Voters.count({ where: { has_voted: true } });

    if (totalVoters === 0) {
      // Manejar el caso especial cuando no hay votantes
      const results = candidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        votes: candidate.votes,
        percentage: 0,
      }));
      return res.status(200).json({ totalVoters: 0, results });
    }

    const results = candidates.map((candidate) => {
      const percentage = (candidate.votes / totalVoters) * 100;
      return {
        id: candidate.id,
        name: candidate.name,
        votes: candidate.votes,
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    res.status(200).json({
      totalVoters: totalVoters,
      results: results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { votesGet, votesStatitisGet, votesPost };