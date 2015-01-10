var fs = require('fs'),
    path = require('path'),
    DB = '',
    Colle = '',
    relpath = path.join(__dirname,'/DB/',DB,'/Collections/',Colle+'.json');
//sd('fcstu','users').findOne()
/**
* Setup Select Database file
* 
* @param {string}DB - DB name
* @param {string}Colle - Collection name
* @param {function} Callback - all method
*/
function StaticDB(DB, Colle, Callback){
    //this.DB += DB;
    //this.Colle += Colle;
    relpath = path.join(__dirname,'/DB/',DB,'/Collections/',Colle+'.json');
    if(!!Callback){
        var met = new Method();
        Callback(met);
    }
    var method = new Method();
    return {
        insert:function(keyword){method.insert(keyword,relpath)},
        findAll:function(callback){method.findAll(relpath,callback);},
        findOne:function(object,callback){method.findOne(object,relpath,callback)},
        remove:function(object){method.remove(object,relpath)},
        update:function(object,update){method.update(object,update,relpath)},
        drop:function(options){method.drop(options,relpath)},
        override:function(object,update){method.override(object,update,relpath)}
        }
    };

/**
* Bind StaticDB Function
*/

StaticDB.prototype = new Method();


function Method(){}

/**
* insert new data, replace save function!
* 
* @param {object}keyword
*/
Method.prototype.insert = function(keyword,relpath){
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
Method.prototype.findAll = function(relpath,callback){
        fs.exists(relpath,function(exists){
            if(!exists){
                console.log("undefined");
                callback(false);
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
Method.prototype.findOne = function(object,relpath,callback){
    //TODO traversal All Object and foreach list than index!
    var exists = fs.existsSync(relpath);
    if(exists){
        var rs = fs.createReadStream(relpath);
                rs.on('data',function(data){
                    var log = JSON.parse(data.toString());
                    for(var i = 0;i<Object.keys(log).length;i++){
                        for(var j = 0;j<Object.keys(log[i]).length;j++){
                            if((Object.keys(log[i])[j] == Object.keys(object)[0]) && ((log[i])[Object.keys(log[i])[j].toString()] == object[Object.keys(object)])){
                                callback(log[i]);
                                return true;
                                break;
                            }
                        }
                    }
                    callback(false);
                    return false;
                });
    }else{
        console.log("undefined");
        return "undefined";
    }
    /*fs.exists(relpath,function(exists){
            if(!exists){
                console.log("undefined");
                return "undefined";
            }else{
                var rs = fs.createReadStream(relpath);
                rs.on('data',function(data){
                    var log = JSON.parse(data.toString());
                    for(var i = 0;i<Object.keys(log).length;i++){
                        for(var j = 0;j<(log[i])[Object.keys(log[i])[j].toString()].length;j++){
                            if((Object.keys(log[i])[j] == Object.keys(object)[0]) && ((log[i])[Object.keys(log[i])[j].toString()] == object[Object.keys(object)])){
                                callback(log[i]);
                                return true;
                                break;
                            }
                        }
                    }
                    callback(false);
                    return false;
                });
            }
    });*/
};


/**
* remove data
* 
* @param {object}object
*/
Method.prototype.remove = function(object,relpath){
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
Method.prototype.update = function(object,update,relpath){
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
                        for(var j = 0;j<Object.keys(log[i]).length;j++){
                            if((Object.keys(log[i])[j] == Object.keys(object)[0]) && ((log[i])[Object.keys(log[i])[j].toString()] == object[Object.keys(object)])){
                                var keys = Object.keys(update)[0];
                                log[i][keys] = update[keys];
                                var ws = fs.createWriteStream(relpath);
                                ws.write(JSON.stringify(log));
                                ws.end();
                                return true;
                                break;
                            }
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
Method.prototype.drop = function(options,relpath){
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
/*
 * Override
 * findObject and Override all
*/
Method.prototype.override = function(object,update,relpath){
    //TODO traversal All Object and foreach list than index!
    var exists = fs.existsSync(relpath);
    if(exists){
        var rs = fs.createReadStream(relpath);
                rs.on('data',function(data){
                    var log = JSON.parse(data.toString());
                    for(var i = 0;i<Object.keys(log).length;i++){
                        for(var j = 0;j<Object.keys(log[i]).length;j++){
                            if((Object.keys(log[i])[j] == Object.keys(object)[0]) && ((log[i])[Object.keys(log[i])[j].toString()] == object[Object.keys(object)])){
                                log[i] = update;
                                console.log(log[i]);
                                var ws = fs.createWriteStream(relpath);
                                ws.write(JSON.stringify(log));
                                ws.end();
                                return true;
                                break;
                                return true;
                                break;
                            }
                        }
                    }
                    callback(false);
                    return false;
                });
    }else{
        console.log("undefined");
        return "undefined";
    }
};
module.exports = StaticDB;
