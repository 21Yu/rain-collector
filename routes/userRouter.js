const express = require('express')
const router = express.Router()
const rainInfo = require('../models/rainInfo')
const authUser = require('../models/authUser')

router.get('/:userId', async (req, res) => {
    try {
        const rainData = await rainInfo.findOne({ userId: req.params.userId }); // Fetch rain data by user ID

        res.render('userPages/dashboard', { rainData, message: ''}); // Pass rain data to the dashboard view
    } catch (error) {
        res.render('userPages/dashboard', { message: 'Error fetching rain data' });
    }
});

router.post('/:rainId/edit', async (req, res) => {
    try {
        // Find rain data by its ID and update the fields
        const updatedRainData = await rainInfo.findByIdAndUpdate(req.params.rainId, {
            date: req.body.date,
            amount: req.body.amount,
            location: req.body.location
        }, { new: true }); // new: true returns the updated document

        res.redirect(`/users/${updatedRainData.userId}`);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.render('userPages/dashboard', { message: 'Error updating rain data' });
    }
})

router.post('/:userId/delete', async (req, res) => {
    try {
        // Delete the user's rain data
        const rainDataDeleted = await rainInfo.findOneAndDelete({ userId: req.params.userId });

        if (!rainDataDeleted) {
            console.log('No rain data found for this user.');
        } else {
            console.log('Rain data deleted successfully.');
        }

        // Delete the user
        const userDeleted = await authUser.findByIdAndDelete(req.params.userId);

        if (!userDeleted) {
            console.log('No user found with this ID.');
            return res.render('userPages/dashboard', { message: 'Error: User not found.' });
        } else {
            console.log('User deleted successfully.');
        }

        // Redirect to the homepage or success page
        res.redirect('/');
    } catch (error) {
        console.error('Error during deletion:', error);
        // res.render('userPages/dashboard', { message: 'Error deleting account or rain data: ' + error.message });
    }
});


module.exports = router