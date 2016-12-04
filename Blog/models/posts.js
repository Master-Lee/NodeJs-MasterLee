var Post = require('../lib/mongo').Post;
var User = require('../lib/mongo').User;
var UserModel = require('./users');

module.exports = {
  // 创建一篇文章
  create: function create(post) {
    post.authorinfo = post.author;
    return Post.create(post);
  },

  // 通过文章 id 获取一篇文章
  getPostById: function getPostById(postId) {
    var query = {};
    if (postId) {
      query._id = postId;
    }
    
    return Post
      .findOne(query)
      .populate({ path: 'authorinfo' })
      .exec();
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getPosts: function getPosts(author) {
    var query = {};
    if (author) {
      query.author = author;
    }

    return Post
      .find(author)
      .populate({ path: 'authorinfo'})
      .exec();
  },

  // 通过文章 id 给 pv 加 1
  incPv: function incPv(postId) {
    return Post
      .update({ _id: postId }, { $inc: { pv: 1 } })
      .exec();
  },

  getRawPostById: function getRawPostById(postId){
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'authorinfo' })
      .exec();
  },

  updatePostById: function updatePostById(postId, author, data){
    return Post.update({ author: author, _id: postId }, { $set: data })
               .exec();
  },

  delPostById: function delPostById(postId, author){
    return Post.remove({ author: author, _id: postId }).exec();
  }
};