const { DataTypes, INTEGER } = require('sequelize')
module.exports = (sequelize) => {
  sequelize.define('product', {
    idProduct: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      notNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {

      type: DataTypes.NUMBER,
      allowNull: false
    },
    stock: { 
      type: DataTypes.BOOLEAN
     },
    categorias: {
      type: DataTypes.JSON,
      allowNull: false
    },
    image: {
      type: DataTypes.JSON,
      allowNull: false
    }
  });
};
