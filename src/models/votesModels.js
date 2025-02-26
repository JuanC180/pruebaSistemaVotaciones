
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Voters from './votersModels.js';
import Candidates from './candidatesModels.js';


class Votes extends Model {

}

Votes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    voter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Voters,
        key: 'id',
      },
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Candidates,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Votes',
    tableName: 'votes',
    timestamps: false,
  },
);



// Relaciones
Voters.hasMany(Votes, { foreignKey: 'voter_id' });
Candidates.hasMany(Votes, { foreignKey: 'candidate_id' });
Votes.belongsTo(Voters, { foreignKey: 'voter_id' });
Votes.belongsTo(Candidates, { foreignKey: 'candidate_id' });

export default Votes;
