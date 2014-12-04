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
       // var log = JSON.parse(data);
        console.log(data);
    });
    
    rs.on('end',function(data){
        console.log(data);
    });
};

var Met = new Method();

Met.find(11);