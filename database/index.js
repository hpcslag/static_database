var fs = require('fs'),
    path = require('path'),
    DB = 'Blog',
    Colle = 'post',
    relpath = path.join(__dirname,'/DB/',DB,'/Collections/',Colle+'.json');

/**
* Setup Select Database file
* 
* @param {string}DB - DB name
* @param {string}Colle - Collection name
* @param {function} Callback - all method
*/
function StaticDB(DB, Colle, Callback){
    this.DB += DB;
    this.Colle += Colle;
    
    var met = new Method();
    Callback(met);
}

function Method(){}

/**
* insert new data, replace save function!
* 
* @param {object}keyword
*/
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

/**
* findAll data
* 
* @param {function}callback (data)
*/
Method.prototype.findAll = function(callback){
        fs.exists(relpath,function(exists){
            if(!exists){
                console.log("undefined");
                return "undefined";
            }else{
                var rs = fs.createReadStream(relpath);
                //if none, create noe, fs.exitis
                rs.on('data',function(data){
                    var log = JSON.parse(data.toString());
                    callback(log);
                });
            }
        });
};

/**
* findOne data
* 
* @param {object}object
* @param {function}callback
*/
Method.prototype.findOne = function(object,callback){
    //TODO traversal All Object and foreach list than index!
    fs.exists(relpath,function(exists){
            if(!exists){
                console.log("undefined");
                return "undefined";
            }else{
                var rs = fs.createReadStream(relpath);
                rs.on('data',function(data){
                    var log = JSON.parse(data.toString());
                    for(var i = 0;i<Object.keys(log).length;i++){
                        if((Object.keys(log[i])[0] == Object.keys(object)[0]) && ((log[i])[Object.keys(log[i])[0].toString()] == object[Object.keys(object)])){
                            callback(log[i]);
                            break;
                        }
                    }
                });
            }
    });
};


/**
* remove data
* 
* @param {object}object
*/
Method.prototype.remove = function(object){
    //TODO forloop find object and remove specified object
    fs.exists(relpath,function(exists){
        if(!exists){
            console.log("undefined");
            return "undefined";
        }else{
            var rs = fs.createReadStream(relpath);
                rs.on('data',function(data){
                    var log = JSON.parse(data.toString());
                    for(var i = 0;i<Object.keys(log).length;i++){
                        if((Object.keys(log[i])[0] == Object.keys(object)[0]) && ((log[i])[Object.keys(log[i])[0].toString()] == object[Object.keys(object)])){
                            delete log[i];
                            var newobj = {};
                            var count = 0;
                            for(var i in log){
                                newobj[count] = log[i]
                                count ++;
                            };
                            var ws = fs.createWriteStream(relpath);
                            ws.write(JSON.stringify(newobj));
                            ws.end();
                            return object + " is be removed";
                        }else{
                            console.log("undefined");
                            return "undefined";
                        }
                    }
                });
        }
    });
};

/**
* update data
* 
* @param {object}object
* @param {object}update
*/
Method.prototype.update = function(object,update){
    //TODO forloop find index data and change up-to-date 
    fs.exists(relpath,function(exists){
            if(!exists){
                console.log("undefined");
                return "undefined";
            }else{
                var rs = fs.createReadStream(relpath);
                rs.on('data',function(data){
                    var log = JSON.parse(data.toString());
                    for(var i = 0;i<Object.keys(log).length;i++){
                        if((Object.keys(log[i])[0] == Object.keys(object)[0]) && ((log[i])[Object.keys(log[i])[0].toString()] == object[Object.keys(object)])){
                            if(typeof update === "object"){
                                log[i] = update;
                                var ws = fs.createWriteStream(relpath);
                                ws.write(JSON.stringify(log));
                                ws.end();
                                return "database everything up-to-date";
                            }
                            else{
                                console.log("update is not the object, can't update!")
                            }
                            break;
                        }
                    }
                    console.log("undefined");
                });
            }
    });
};


/**
* Drop the data
* 
* @param {object}optinos
* 
* !! This options is experimental features.
*/
Method.prototype.drop = function(options){
    var op = options || null;
    if(!!options && (typeof options === "object" || "string")){
        console.log("Reference options");
    }else{
        fs.exists(relpath,function(exists){
            if(!exists){
                console.log("not file");
            }else{
                fs.unlinkSync(relpath,function(err){
                    if(err){
                        console.log("Drop Fail!");
                    }else{
                        console.log(true);
                    }
                });
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