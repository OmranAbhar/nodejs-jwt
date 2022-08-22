npm init
npm install express body-parser mysql
npm install nodemon

-----
const express=require('express');
const app=express();
	app.get('/',(req,res)=>{
	res.send("hellow world");
});

app.listen(3001,()=>{
	console.log("running on port 3001");
})

RunApp=> node index.js

package.json

 "scripts": {
    "start": "node index.js",
    "devStart": "nodemon index.js"
  },
  
 RunApp => npm run start or npm run devStart
 
 ________________________________________
 const mysql=require('mysql');
 const db=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'notejsdb',
 });
 app.get("/data",(req,res)=>{
	const sqlInsert="INSERT INTO `user` ( `name`, `email`, `password`) VALUES (?, ?,?);";
	db.query(sqlInsert,[name,email,password],(err,result)=>{
		res.send("Insert Record");
	});
 });
 
 --------------------------
 app.post('/api/insert',(req,res)=>{
	const sqlInsert="INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES (NULL, 'ahmad', 'a@a.com', '123');";
	db.query(sqlInsert,(err,result)=>{
		res.send("Insert Record");
	});
 });
 