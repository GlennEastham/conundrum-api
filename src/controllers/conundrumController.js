'use strict';
require("../database/connection");
var Word = sequelize.models.Word;

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

exports.getConundrum = function (req, res) {
    Word.findOne({ order: [sequelize.literal('random()')] }).then((word) => {
        return res.json({ data: scrambleWord(word) });
    });
};

exports.scrambleWord = function (word) {
    const randomWord = word;
    let jumbledWord = randomWord.word.shuffle();
    let returnWord = {};
    returnWord.id = randomWord.uuid
    returnWord.word = jumbledWord;
    return returnWord;
};

exports.solveConundrum = function (req, res) {
    console.log(req.body);
    const incomingWord = req.body;
    Word.findOne({
        where: {
            uuid: incomingWord.id
        },
        raw: true
    }).then((wordToSolve) => {
        if (wordToSolve.word === incomingWord.word) {
            return res.json({ 'Answer': 'Correct' })
        } else {
            return res.json({ 'Answer': 'Incorrect' })
        }
    });
};
