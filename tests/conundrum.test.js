require('../src/database/connection')
require('../models')
const wordController = require('../src/controllers/conundrumController')
const uuidv4 = require('uuid/v4')

test('Test scrambleWord function', () => {
  const testWord = { uuid: uuidv4(), word: 'Bazinga' }
  const scrambledWord = wordController.scrambleWord(testWord)
  const testWordLength = testWord.word.length

  expect(scrambledWord.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  expect(scrambledWord.word).toHaveLength(testWordLength)

  testWord.word.split('').forEach(char => {
    expect(scrambledWord.word).toContain(char)
  })
})
