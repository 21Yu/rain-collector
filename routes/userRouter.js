const express = require('express')
const router = express.Router()
const rainInfo = require('../models/rainInfo')

router.get('/:userId', async (req, res) => {
    try {
        const rainData = await rainInfo.findOne({ userId: req.params.userId }); // Fetch rain data by user ID

        res.render('userPages/dashboard', { rainData, message: ''}); // Pass rain data to the dashboard view
    } catch (error) {
        res.render('userPages/dashboard', { message: 'Error fetching rain data' });
    }
});

module.exports = router