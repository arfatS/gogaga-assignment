const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT

//Public path
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

//Set view engine
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false }))

//Database connection
const connectDb = require('../db/mongodb')
const database = 'gogaga'


//Routes
app.get('/', (req,res) => {
    res.render('index')
})

app.get('/gogaga/list',(req,res) => {
    try {
        connectDb((error, client) => {
            if (error) {
                return console.log('Unable to connect to database')
            }
            const db =  client.db(database)

            db.collection('user').find().toArray()
            .then((result)=>{

                const users = []
                result.forEach(data => {
                    users.push([data.name, data.age])
                });

                res.render('list', { users })
            })
            .catch((error)=>{
                res.status(404).send({ error })
            })
        })
    } catch (error) {
        res.status(500).send({ error })
    }
})

app.get('/gogaga/add', (req,res) => {
    res.render('add')
})

app.post('/gogaga/add', (req,res) => {
    try {
        
        connectDb((error, client) => {
            if (error) {
                return console.log('Unable to connect to database')
            }
            const db =  client.db('gogaga')
            
            db.collection('user').insertOne(req.body)
            .then((result)=>{
                res.redirect('/gogaga/list')

            }).catch((error)=>{
                res.status(500).send({ error })
            })
        })

    } catch (error) {
        res.status(500).send({ error })
    }
})

//Serve app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
