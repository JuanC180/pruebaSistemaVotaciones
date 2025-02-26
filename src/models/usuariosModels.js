import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


class Users extends Model {

}

Users.init(
  {
    emailUser: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false,
  }
);

export default Users;