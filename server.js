const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const homeRouter = require('./routes/homeRouter')
const authenRouter = require('./routes/authenRouter')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.use('/', homeRouter)
app.use('/authen', authenRouter)

app.listen(1000, ()=>{
    console.log("port connected")
})