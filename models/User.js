const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
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
      validate: {
        len: [7],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },
      beforeUpdate: async (updatedUser) => {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        return updatedUser;
      },
    },
    // },
    // {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "users",
  }
);

module.exports = User;
