const UserStatus = require('../model/userStatus');
const constant = require('../config/constant');
const Validate = require('../tool/validate');

class Change {
  constructor() {
    this.validate = new Validate();
    this.realType = [{type: 'Text'}];
  }

  showText() {
    return {
      type: 'Text', info: `请选择您的角色[请输入序号]:
     1.我要当学员
     2.我要当助教
     3.我想合作`
    };
  }

  handler(userId, message, callback) {
    if (this.validate.check(message.type, this.realType) && message.text === 'q') {
      UserStatus.update({userId: userId}, {status: 'choice'}, (err) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, this.showText());
      });
    } else {
      return callback(null, constant.validate.err);
    }
  }
}

module.exports = Change;