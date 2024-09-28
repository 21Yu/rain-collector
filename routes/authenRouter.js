const express = require('express')
const router = express.Router()
const authUser = require('../models/authUser')
const rainInfo = require('../models/rainInfo')

router.get('/login', (req, res) => {
    res.render('authen/login', { message: ''})
})

router.get('/signUp', (req, res) => {
    res.render('authen/signUp', { message: ''})
})

router.post('/signUp', async (req, res) => {
    try {
        const user = new authUser({
            userName: req.body.userName,
            password: req.body.password
        })
        await user.save()
        
        const rainData = new rainInfo({
            amount: 0,
            location: 'Vancouver',
            userId: user._id  
        })
        await rainData.save()
        
        res.render('authen/signUp', { message: 'Sign up success'})
    } catch {
        res.render('authen/signUp', { message: 'error signing up'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await authUser.findOne({ userName: req.body.userName});

        if (!user) {
            return res.render('authen/login', { message: 'user does not exist'})
        }

        if (user.password == req.body.password) {
            return res.redirect(`/users/${user._id}`) 
        } else {
            return res.render('authen/login', { message: 'wrong password'})
        }
        
    } catch {
        res.render('authen/login', { message: 'something went wrong'})
    }
})
module.exports = router