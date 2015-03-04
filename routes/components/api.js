var User = require('../../model/user');

exports.updateValue = function (req, res) {
  var value = parseInt(req.body.amount, 10);
  User.findOne({
    _id : req.user._id
  }, function (err, user) {
    if (err) throw err;
    user.money = value;
    user.save(function (err, user) {
      if (err) {
        res.status(400).send('Value must be an integer!');
      } else {
        res.send({ amount: value });
      }
    });
  });
};

exports.totalMoney = function (req, res) {
  User.find({}, function (err, users) {
    if (err) throw err;
    var total = 0;
    for (var i = 0, j = users.length; i < j; i++) {
      var user = users[i];
      total += user.money;
    }
    res.send({ total: total, users: users.length, avg: total / users.length });
  });
};