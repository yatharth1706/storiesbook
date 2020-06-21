/** ---------- Router Configuration  -------------- */

const express = require('express');
const router = express.Router();


/** 
 * GET /
 * Function: Login/Landing Page
 */
router.get('/', (req,res) => {
    res.render('login', {
        layout: 'login'
    })
})


/** 
 * GET /dashboard
 * Function: Dashboard
 */
router.get('/dashboard', (req,res) => {
    res.render('dashboard')
})


module.exports = router;