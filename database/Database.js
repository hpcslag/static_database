var fs = require('fs'),
    DB = 'Blog',
    Colle = 'post';

function StaticDB(DB, Colle, Callback){
    this.DB += DB;
    this.Colle += Colle;
    
    var met = new Method();
    Callback(met);
}

function Method(){}

Method.prototype.insert = function(keyword){
    var rs = fs.createReadStream('./DB/'+DB+'/Collections/'+Colle+'.json');
    rs.on('data',function(data){
        var log = JSON.parse(data.toString());
        log[Object.keys(log).length] = keyword;
        var ws = fs.createWriteStream('./DB/'+DB+'/Collections/'+Colle+'.json');
        ws.write(JSON.stringify(log));
        ws.end();
    });
};

Method.prototype.drop = function(options){
    var op = options || null;
    if(!!options && (typeof options === "object" || "string")){
        console.log("Reference options");
    }else{
        //TO DO Delete All Database File
        console.log("Drop All Database \n Drop This: \n");
        fs.readdir('./DB/'+DB+'/Collections/');

    }
};

//var Met = new Method();
new StaticDB('Blog','post',function(met){
    met.insert({"name":"999"});
});
//Met.drop("");

//Met.find({"name":"sdsd"});