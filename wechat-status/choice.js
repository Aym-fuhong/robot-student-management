const UserStatus = require('../model/userStatus');
const constant = require('../config/constant');
const Validate = require('../tool/validate');

class Choice {
  constructor() {
    this.validate = new Validate();
    this.realType = [{type: 'Text'}];
  }

  showText(number) {
    if (number === '3') {
      return {type: 'Text', info: '请您直接发送合作意向邮件至sponsor@codinggirls.club,我们会迅速与您取得联系'};
    } else {
      return {type: 'Text', info: '请输入你的姓名'};
    }
  }

  handler(userId, message, callback) {
    const status = message.text === '1' ? 'information' : message.text === '2' ? 'assistant' : 'finish';
    if (this.validate.check(message.type, this.realType) && message.text === 'q') {
      return callback(null, constant.validate.info);
    } else if (this.validate.check(message.type, this.realType) && message.text.match(/[1-3]/)) {
      UserStatus.update({userId: userId}, {status: status}, (err) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, this.showText(message.text));
      });
    } else {
      return callback(null, constant.validate.err);

    }
  }
}

module.exports = Choice;