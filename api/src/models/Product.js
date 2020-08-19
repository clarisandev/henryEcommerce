const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
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
