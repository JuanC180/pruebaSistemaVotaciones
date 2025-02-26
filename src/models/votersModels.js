
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


class Voters extends Model {
  name;
  email;
  has_voted;
}

Voters.init(
  {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true,
      allowNull: false,
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    has_voted: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { 
    sequelize,
    modelName: 'Voters',
    tableName: 'voters',
    timestamps: false,
  },
);

export default Voters;
