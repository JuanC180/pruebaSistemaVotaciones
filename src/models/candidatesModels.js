import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


class Candidates extends Model{
  name;
  party;
  votes;
}

Candidates.init(
  {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    party:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    votes:{
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Candidates',
    tableName: 'candidates',
    timestamps: false,
  }
);

export default Candidates;