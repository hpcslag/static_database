#### Static Database

this static db is reference MongoDB, and it look like MongoDB!, This DB File is hashcode (Json Type)

Using Database.js to use!

\DB Folder Structure:
 * DB_name
 	* Collection(Collections Files)
 		* Collection_name

#API Use

####setup

````javascript
new StaticDB('DB Name','Collection Name',function(met){
	//if DB, Colle are not yet on record, it will create new for you!
});
````

####callback

````javascript
new StaticDB('DB Name','Collection Name',function(met){
	met.insert({name:"Mac"});
});
````

####insert([object])

````javascript
met.insert({name:"Mac"});
````
