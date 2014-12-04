var fs = require('fs'),
    DB = '',
    Colle = '';

function StaticDB(DB, Colle, Callback){
    this.DB = DB;
    this.Colle = Colle;
    
    Callback(Method);
}

function Method(){}

Method.prototype.find = function(keyword){
    var rs = fs.createReadStream('./DB/Blog/Collections/post.json');
    rs.on('data',function(data){
        var log = JSON.parse(data.toString());
        log[Object.keys(log).length] = keyword;
        var ws = fs.createWriteStream('./DB/Blog/Collections/post.json');
        ws.write(JSON.stringify(log));
        ws.end();
    });
};

var Met = new Method();

Met.find({"name":"sdsd"});