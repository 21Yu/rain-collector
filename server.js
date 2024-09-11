const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const homeRouter = require('./routes/homeRouter')
const authenRouter = require('./routes/authenRouter')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/raincollector')
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.use('/', homeRouter)
app.use('/authen', authenRouter)

app.listen(1000, ()=>{
    console.log("port connected")
})