const { Model, DataTypes } = require('sequelize');
// Import the md5 package
const md5 = require('md5'); 
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
     // Use md5 to hash the login password
    const hashedLoginPw = md5(loginPw);
    // Compare the hashed passwords
    return hashedLoginPw === this.password; 
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      beforeCreate: (newUserData) => {
        newUserData.password = md5(newUserData.password); 
        return newUserData;
      },
      beforeUpdate: (updatedUserData) => {
        updatedUserData.password = md5(updatedUserData.password); 
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;