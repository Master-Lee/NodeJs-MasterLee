var config = require('config-lite');
var marked = require('marked');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

var createdTimePlugin = function(schema){
  schema.post('find',function(results){
    results.forEach(function(item){
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
  });

  schema.post('findOne',function(result){
    if (result)
    {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
  });
};

var lastModifyTimePlugin = function(schema){
  schema.add({ lastModify : String });
  schema.pre('save',function(next){
    this.lastModify = moment(new Date()).format('YYYY-MM-DD HH:mm');
    next();
  });
};

var contentToHtmlPlugin = function(schema){
  schema.post("find", function(result){
    result.forEach(function(item){
      item.content = marked(item.content);
    });
  });

  schema.post("findOne", function(result){
    if (result){
      result.content = marked(result.content);
    }
  });
};

mongoose.connect(config.mongodb);

//global plugin
mongoose.plugin(lastModifyTimePlugin);
mongoose.plugin(createdTimePlugin);

UserSchema = new Schema({
  name: {type: String, unique: true, index: true},
  password: String,
  avatar: String,
  gender: { type: 'String', enum: ['m', 'f', 'x']},
  bio: String
});

UserSchema.index({ name: 1 });
exports.User = mongoose.model('User', UserSchema);

PostSchema = new Schema({
  author: {type: Schema.Types.ObjectId, index: true},
  title: String,
  content: String,
  pv: Number,
  authorinfo: {type: Schema.Types.ObjectId, ref: 'User'}
});

PostSchema.plugin(contentToHtmlPlugin);

PostSchema.index({ author: 1, _id: -1});
exports.Post = mongoose.model('Post', PostSchema);

var CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  content: String,
  postId: { type: Schema.Types.ObjectId, ref: 'Post'}
});

CommentSchema.index({ postId: 1, _id: 1 });
CommentSchema.index({ author: 1, _id: 1 });

exports.Comment = mongoose.model('Comment', CommentSchema);