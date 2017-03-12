var fs = require('fs');

var bettingEvaluators = {
  addProfits: function (winner) {
    fs.writeFile('./winner', '{player: ' + winner.info.name + ', action: 1}', function (err,data) {
      if (err) {
        return console.log(err);
      }
    })
  },
  removeProfits: function (loser) {
    fs.writeFile('./loser', '{player: ' + loser.info.name + ', action: 0}', function (err,data) {
      if (err) {
        return console.log(err);
      }
    })
  }
}

module.exports = bettingEvaluators;