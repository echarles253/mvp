const express = require('express');
const config = require('./config')[process.env.NODE_ENV||'dev']
const port = config.port
const cors = require('cors');
const {Client} = require('pg');

const client = new Client({
    connectionString:config.connectionString
})
const app = express();
app.use(cors());
app.use(express.json());
client.connect()
//console.log(client)
app.route('/api/users')
.get((req,res) =>{
    client.query('SELECT * FROM users')
    .then(result => {
        
        res.status(200).send(result.rows)
    })
})

.post((req,res) => {
let {user_name,post_subject,post} = req.body
client.query('INSERT INTO users (user_name,post_subject,post) VALUES ($1,$2,$3)'[user_name,post_subject,post], 
(err,result)=>{
    if(err) {
        console.log(err)
    } else {
        res.status(201).send(result.rows)
    }
})
})







app.listen(port,()=>{
    console.log('listening on',port)
})