const express = require('express')
const router = express.Router()
const authUser = require('../models/authUser')

router.get('/', (req, res) => {
    res.render('authen/login')
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
module.exports = router