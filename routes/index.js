/** ---------- Router Configuration  -------------- */

const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Story = require('../models/Story');

/** 
 * GET /
 * Function: Login/Landing Page
 */
router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login'
    })
})


/** 
 * GET /dashboard
 * Function: Dashboard
 */
router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({ user: req.user.id}).lean()
        
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })

    } catch(e) {
        res.render('errors/500')
    }
    
    
})


module.exports = router;