'use strict';
module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
    word: DataTypes.STRING,
    uuid: DataTypes.STRING
  }, {freezeTableName: true});
  Word.associate = function(models) {
    // associations can be defined here
  };
  return Word;
};