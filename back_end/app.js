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
app.use(express.static('public'))
app.route('/api/users')
.get((req,res) =>{
    client.query('SELECT * FROM users')
    .then(result => {
        
        res.status(200).send(result.rows)
    })
})

.post((req,res) => {
    let post = req.body
// let {user_name,post_subject,post} = req.body
//console.log(req.body, 'these are not null')
client.query('INSERT INTO users (users_name,post_subject,post) VALUES ($1,$2,$3) RETURNING *',[post.name,post.subject,post.post], 
(err,result)=>{
    if(err) {
        console.log(err)
    } else {
        console.log(result.rows)
        res.status(201).send(result.rows[0])
    }
})
})


app.route('/api/users/:id')
.delete((req,res)=>{
    let id = req.params.id
    client.query('DELETE FROM users WHERE id = $1',[id],
    (err,result) => {
        if(err) {
            console.log(err)
        } 
        res.status(204).send('deleted post')
    })
})

app.patch((req,res)=>{
    let id = req.params.id
    let post = req.body
    if(post.name) {
        client.query(`UPDATE users SET users_name = ${post.name} WHERE id = ${id}`)

    } 
    if(post.subject) {
        client.query(`UPDATE users SET post_subject = ${post.subject} WHERE id = ${id}`)
    }
    if(post.post) {
        client.query(`UPDATE users SET post = ${post.post} WHERE id = ${id}`)
    }
    res.status(201).send('updated post')
})







app.listen(port,()=>{
    console.log('listening on',port)
})