const UserStatus = require('../model/userStatus');
const User = require('../model/user');
const async = require('async');

class Srct {
  showText() {
    return {type:'text', info: '你擅长的编程语言是什么'};
  }

  handler(userId, str, type, callback) {
    async.waterfall([
      (done) => {
        User.update({userId: userId}, {city: str}, done);
      },
      (data, done) => {
        UserStatus.update({userId: userId},{status:'language'},done);
      }
    ],(err) => {
      if(err){
        return callback(err, null);
      }
      return callback(null, this.showText());

    });
  }
}

module.exports = Srct;