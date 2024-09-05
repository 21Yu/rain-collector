const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('authen/login')
})

router.get('/signUp', (req, res) => {
    res.render('authen/signUp')
})

module.exports = router