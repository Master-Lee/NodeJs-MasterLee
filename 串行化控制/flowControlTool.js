var flow = require('nimble');
//函数数组，一个一个执行
flow.series(
[
	function(callback){
		setTimeout(function(){
			console.log('I execute first');
			callback();
		}, 1000);
	},

	function(callback){
		setTimeout(function(){
			console.log('I execute next');
			callback();
		},500);
	},

	function(callback){
		setTimeout(function(){
			console.log('I execute last');
			callback();
		},100);
	}
]);         
