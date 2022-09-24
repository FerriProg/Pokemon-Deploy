const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,                   //si no le asignara un valor, sequelize le asignaría un entero e incrementaría de a uno. Pero si me viene de la api un entero, habría colison. 
      defaultValue: DataTypes.UUIDV4,         //UUID genera un numero random uasando letras y numeros que va a ser unico, específico y no se va a repetir. Le paso por default UUIDV4.
      allowNull: false,
      primaryKey: true,
    },
    hp: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  { timestamps: false }
  );
};
