'use strict';
const fs = require('fs');
const path = require("path");

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

exports.getConundrum = function (req, res) {

    //returns a random conundrum from the words.json file
    //todo replace with a mongoose model (mongoDB)

    const file = fs.readFileSync(path.resolve(__dirname, "../res/words.json"));
    let words = JSON.parse(file);
    const wordsArray = Object.values(words)
    const randomWord = wordsArray[parseInt(Math.random() * wordsArray.length)]
    let jumbledWord = randomWord.text.shuffle()
    randomWord.text = jumbledWord;

    return res.json({ data: randomWord });

};

exports.solveConundrum = function (req, res) {
    const incomingWord = req.body;
    const file = fs.readFileSync(path.resolve(__dirname, "../res/words.json"));
    let words = JSON.parse(file);
    const wordsArray = Object.values(words)

    let wordToSolve = wordsArray[incomingWord.id - 1] //todo temporary need to add mongoDB asap

    if (wordToSolve.text === incomingWord.word) {
        return res.json({ 'Answer': 'Correct' })
    } else {
        return res.json({ 'Answer': 'Incorrect' })
    }

};
