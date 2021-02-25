const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const app = express();

app.use(bodyParser.json());
app.use(cors());


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Dungeon_Master7',
    database : 'postgres'
  }
});

app.post('/signin', (req, res)=> { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register',(req, res)=> { register.handleRegister(req, res, db, bcrypt) } )

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})

/* 
this functionality is only for the Devs
app.get('/profile/:id',(req,res)=>{
	const {id} = req.params;
	db.select('*').from('users').where({id})
	.then(user=>{
		if (user.length){
			res.json(user[0]);
		} else {
			res.status(400).json('Not Found')
		}
	})
	.catch(err=> res.status(400).json('Error Getting User'))
})
*/




app.listen(3001,()=>{
	console.log('app is running on port 3001');
})
