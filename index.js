require('dotenv').config();
const express=require('express');
const app=express(); 
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
 
app.post('/login',(req,res)=>{
	const username=req.body.username;
	const user={name:username};
	const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
	res.json({accessToken:accessToken})
});

app.get('/logout',authenticateToken,(req,res)=>{
	// jwt.out(req.token);
	jwt.sign({expiresIn:'0s'});
	res.sendStatus(204);
});


app.get('/welcome',authenticateToken,(req,res)=>{
	res.send(req.user.name);
});

function authenticateToken(req,res,next){
	const authHeader=req.headers['authorization'];
	const token=authHeader && authHeader.split(' ')[1];
	if(token==null) return res.sendStatus(401);
	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
		if(err) return res.sendStatus(403);
		req.user=user;
		req.token=token;
		next();
	});
}

app.listen(3001,()=>{
	console.log("running on port 3001");
})