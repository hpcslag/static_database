var staticdb = require('./database');

new staticdb('Blog','post',function(met){
	met.remove({name:"a"});
	/*met.findOne({"name":"aa"},function(data){
		console.log(data);
	});*/
	/*met.findAll(function(data){
		console.log(data[2].name);
	});*/
	//met.insert({name:'a'});
	//met.drop();
});