## Static Database

this static db is reference MongoDB, and it look like MongoDB!, This DB File is hashcode (Json Type)

Using Database.js to use!

\DB Folder Structure:
 * DB_name
 	* Collection(Collections Files)
 		* Collection_name

##Install
````shell
$ npm install staticdb -g
$ statucdb -n "Your Database Name"
````

#Command Line Setup

#### first setup your Database
!!!! You need to set before using, otherwise it will fail. !!!!
````Bash
$ staticdb -n "Your Database Name"
````

#API Use

####setup([Database name],[Collection name], callback)

````javascript
new StaticDB('DB Name','Collection Name',function(met){
	//if DB, Colle are not yet on record, it will create new for you!
	//control database here!
});
````

####First use demo (insert data)

````javascript
new StaticDB('DB Name','Collection Name',function(met){
	met.insert({name:"Mac"});
});
````

####insert([object])

insert is replace save() , so insert same save feature!
just new data in the database!

````javascript
met.insert({name:"Mac"});
````

####drop()
This is experimental features. be careful bug.  this feature is delete all data collection!, if you drop! just gone!
````javascript
met.drop();
````

####remove([object])
remove something!
````javascript
met.remove({name:"eric"});
````

####update([object],[update])
change find index data to your update object!. the update parameter must be object type!
````javascript
met.update({"name":"eric"},{name:"ohmygod"});
````

####findAll([callback])
find all in collection!
````javascript
met.findAll(function(data){ console.log(data) });
````

####findOne([object],[callback])
find the object in collection
````javascript
met.findOne({name:'mac'},function(data){ console.log(data) });
````
