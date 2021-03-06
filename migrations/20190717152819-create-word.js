'use strict'

const uuidv4 = require('uuid/v4')
const fs = require('fs')
const path = require('path')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Word', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      word: {
        type: Sequelize.STRING
      },
      uuid: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then((creation) => {
      const file = fs.readFileSync(path.resolve(__dirname, '../src/res/words.json'))
      const words = JSON.parse(file)
      const wordsArray = Object.values(words)
      wordsArray.forEach(function (item, index) {
        index === 0 ? item['uuid'] = '68a176b9-7360-48b3-b725-9a54b646c669' : item['uuid'] = uuidv4()
        item['createdAt'] = new Date()
        item['updatedAt'] = new Date()
      })

      return queryInterface.bulkInsert('Word', wordsArray)
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Word')
  }
}
