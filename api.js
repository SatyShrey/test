

const express=require('express')
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const conStr="mongodb+srv://sndsatya:QtAy7QbfwCnzUhvu@clustersnd.adfao0n.mongodb.net"
const mongoClient=require("mongodb").MongoClient

app.get('/',(req,res)=>{
    res.send('Welcome to test.')
})

mongoClient.connect(conStr).then(clientObject=>{
    var db=clientObject.db('test')

  app.get('/users',(req,res)=>{
    db.collection("users").find({}).toArray().then(users=>{res.send(users);res.end})
  })

  app.post('/adduser',(req,res)=>{
    db.collection("users").insertOne(req.body).then(()=>{res.send('user added');res.end})
  })

})

app.listen(8080,()=>{console.log('database connected, port:8080')})