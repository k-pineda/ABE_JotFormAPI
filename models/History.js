const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

class History extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

History.init(
  {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'book',
        key: 'id',
      },
    },
  },
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'history',
  },
);

module.exports = History;
