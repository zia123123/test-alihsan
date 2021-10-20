'use strict';

module.exports = (sequelize, DataTypes) => {
  const auth = sequelize.define('auths', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nama_puskesmas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  }, {
    tableName: "auths"
  });

  auth.associate = function(models) {
   
  };

  return auth;
};