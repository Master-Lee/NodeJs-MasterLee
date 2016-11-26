 var fs = require('fs');
 var fdPath = require('path');
 stat = fs.stat;


 var copy = function(src, dst){
 	//读取目录中的所有文件/目录
 	fs.readdir(src,function(err, paths){
 		if(err){
 			throw err;
 		}
 		console.log(paths);
 		paths.forEach(function(path){
 			var _src = fdPath.join(src,path),
 				_dst = fdPath.join(dst,path),
 				readable, writeable;
 			console.log(_src);
 			console.log(_dst);
 			stat(_src,function(err,st){
 				if(err){
 					throw err;
 				}

 				//判断是否为文件
 				if(st.isFile()){
 					//创建读取流
 					readable = fs.createReadStream(_src);
 					//创建写入流
 					writeable = fs.createWriteStream(_dst);

 					//通过管道来传输流
 					readable.pipe(writeable);
 				}
 				else if(st.isDirectory()){
 					//如果是目录，则递归
 					exists(_src,_dst,copy);
 				}
 			});
 		});
 	});
 };

 var exists = function(src,dst,callback){
 	fs.exists(dst,function(exists){
 		if(exists)
 		{
 			callback(src,dst);
 		}
 		else
 		{
 			fs.mkdir(dst,function(){
 				callback(src,dst);
 			});
 		}
 	});
 };

 exists('./src','./dst2',copy);