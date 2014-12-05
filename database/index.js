var fs = require('fs'),
    path = require('path'),
    DB = 'Blog',
    Colle = 'post',
    relpath = path.join(__dirname,'/DB/',DB,'/Collections/',Colle+'.json');

function StaticDB(DB, Colle, Callback){
    this.DB += DB;
    this.Colle += Colle;
    
    var met = new Method();
    Callback(met);
}

function Method(){}

Method.prototype.insert = function(keyword){
    fs.exists(relpath,function(exists){
        if(!exists){
           if(typeof keyword != "object")
                fs.writeFile(relpath,'{}',function(err){ console.log("can't create") });
            else
                fs.writeFile(relpath,JSON.stringify({"0":keyword}));
        }else{
            var rs = fs.createReadStream(relpath);
            //if none, create noe, fs.exitis
            rs.on('data',function(data){
                var log = JSON.parse(data.toString());
                log[Object.keys(log).length] = keyword;
                var ws = fs.createWriteStream(relpath);
                ws.write(JSON.stringify(log));
                ws.end();
            });
        }
    });
};

Method.prototype.find = function(){};

Method.prototype.findOne = function(){};

Method.prototype.remove = function(){};

Method.prototype.update = function(){};

Method.prototype.drop = function(options){
    var op = options || null;
    if(!!options && (typeof options === "object" || "string")){
        console.log("Reference options");
    }else{
        //TO DO Delete All Database File
        fs.unlinkSync(relpath,function(err){
            if(err){
                conosle.log("Drop Fail!");
            }else{
                console.log(true);
            }
        });
    }
};

//var Met = new Method();
/*new StaticDB('Blog','post',function(met){
    met.insert({name:"999"});
    //met.drop();
});*/
//Met.drop("");

//Met.find({"name":"sdsd"});

module.exports = StaticDB;