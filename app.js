var staticdb = require('./database');

new staticdb('Blog','post',function(met){
	met.drop();
});