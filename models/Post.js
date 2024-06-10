const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'name',
        unique: false
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Post;