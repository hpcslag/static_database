var staticdb = require('./database');

new staticdb('Blog','post',function(met){
	//met.insert({aa:'a'});
	met.drop();
});