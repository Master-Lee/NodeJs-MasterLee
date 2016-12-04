// Schema ： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

// Model ： 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对

// Entity ： 由Model创建的实体，他的操作也会影响数据库

var mongoose = require('mongoose');
var config = require('./config');
var db = mongoose.createConnection('localhost', 'practise');


var UserSchema = new mongoose.Schema({
  user_id : {type : Number, index : true},
  username: {type : String }
});

var User = db.model('User', UserSchema);

// User.findOne({ 'user_id': 1987 }, 'user_id username', function (err, user){
//   if (err) return handleError(err);
//   debugger;
//   if (user){
//     User.remove({'user_id': 1987}, function(err,user){
//       console.log('delete success');
//     });
//   }
// });

// User.findOne({ 'user_id': 1983 }, 'user_id username', function (err, user){
//   if (err) return handleError(err);
//   debugger;
//   if (user){
//     User.remove({'user_id': 1983}, function(err,user){
    
//       console.log('delete success');
//     });
//   }
// });

var userEntity = new User({user_id:1987,username:'lee'});
// var User = mongoose.model('User');
console.log('user',userEntity.user_id,userEntity.username);

//入库
userEntity.save();
User.create({'user_id': 1983, username:'green'});

// User.findOne({'user_id': 1987 }, 'user_id username', function (err, user){
//   if (err) return handleError(err);
//   debugger;
//   console.log('user', user.username);
// });

