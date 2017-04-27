const UserStatus = require('../model/userStatus');

class Group {
  showText(userId) {
    return {type: 'Text', info: 'welcome '+ userId + ' to the group'};
  }

  handler(groupId, message, userId, callback) {
    UserStatus.create({userId: groupId, status: 'topic'}, (err) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, this.showText(userId));
    });
  }
}

module.exports = Group;