var net = require('net');
var result = [];

function scan(host, start, end, callback){
	console.time('port scan time');
	var count = end - start;
	for(var i = start; i <= end; i++){
		var item = net.connect({host:host,port:i},function(i){
					return function(){
						result.push(i);
						this.destroy();
					}
				}(i));
		item.on('error',function(err){
			if(err.errno === 'ECONNREFUSED')
			{
				this.destroy();
			}
		});

		item.on('close', function(){
			if(!count--){
				console.timeEnd('port scan time');
				callback(result);
			}
		});
	}
};

scan('192.168.1.1', 1,200,function(result){
	for(var i = 0; i < result.length; i++)
	{
		console.log('port：' + result[i] + ' is open!');
	}
});