const express = require('express')
const router = express.Router()
const authUser = require('../models/authUser')

router.get('/', (req, res) => {
    res.render('authen/login', { message: ''})
})

router.get('/signUp', (req, res) => {
    res.render('authen/signUp')
})

router.post('/', async (req, res) => {
    try {
        const user = new authUser({
            userName: req.body.userName,
            password: req.body.password
        })

        await user.save()
        res.render('authen/login', { message: 'Sign up success'})
    } catch {
        res.render('authen/login', { message: 'error signing up'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await authUser.findOne({ userName: req.body.userName});

        if (!user) {
            return res.render('authen/login', { message: 'user does not exist'})
        }

        if (user.password == req.body.password) {
            return res.render('userPages/dashboard', { userMessage: user.userName})
        } else {
            return res.render('authen/login', { message: 'wrong password'})
        }
        
    } catch {
        res.render('authen/login', { message: 'something went wrong'})
    }
})
module.exports = router