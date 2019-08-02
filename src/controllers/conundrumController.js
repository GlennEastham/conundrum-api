'use strict'
const sequelize = require('../database/connection')
var Word = sequelize.models.Word

exports.shuffle = function (word) {
  var a = word.split('')
  var n = a.length

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a.join('')
}

exports.scrambleWord = function (word) {
  const randomWord = word
  const jumbledWord = exports.shuffle(randomWord.word)
  const returnWord = {}
  returnWord.id = randomWord.uuid
  returnWord.word = jumbledWord
  return returnWord
}

exports.getRandomConundrum = function (req, res) {
  Word.findOne({ order: [sequelize.literal('random()')] }).then((word) => {
    return res.json(exports.scrambleWord(word))
  })
}

exports.getConundrum = function (req, res) {
  const incomingWord = req.body
  Word.findOne({
    where: {
      uuid: incomingWord.id
    },
    raw: true
  }).then((correctWord) => {
    return res.json(exports.solveConundrum(incomingWord.word, correctWord.word))
  })
}

exports.solveConundrum = function (incomingWord, correctWord) {
  if (incomingWord === correctWord) {
    return { Correct: true }
  } else {
    return { Correct: false }
  }
}
