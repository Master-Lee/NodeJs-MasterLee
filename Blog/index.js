var path = require('path');
var express = require('express');
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  name: config.session.key,    //cookie中保存session id的字段名称
  secret: config.session.secret,   //通过设置secret来计算hash值，并存放在cookie中，使产生的signedCookie防篡改
  cookie: {
    maxAge: config.session.maxAge   //过期时间，过期后cookie中的sessioin id自动删除
  },
  store: new MongoStore({
    url: config.mongodb     //mongodb 地址
  })
}));

app.use(flash());     //flash中间件，用来显示通知

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true// 保留后缀
}));

app.locals.blog = {
  title: pkg.name,
  description: pkg.description
};

app.use(function(req,res,next){
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

routes(app);

app.listen(config.port,function(){
  console.log(`${pkg.name} listening  on port ${config.port}`);
});