var User = require('../lib/mongo').User;
module.exports = {
  create: function create(user){
    // return User.create(user).exec();
    return User.create(user);
  },

  // 通过用户名获取用户信息
  getUserByName: function getUserByName(name) {
    return User
      .findOne({ name: name });
      // .addCreatedAt()
      // .exec();
  },

  getUserById: function getUserById(authorId){
    return User
      .findOne({_id: authorId});
  }
};