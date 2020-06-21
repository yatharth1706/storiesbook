/** ---------- Router Configuration  -------------- */

const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

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
router.get('/dashboard', ensureAuth, (req,res) => {
    res.render('dashboard', {
        name: req.user.firstName
    })
})


module.exports = router;