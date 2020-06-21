/** ---------- Router Configuration  -------------- */

const express = require('express');
const router = express.Router();


/** 
 * GET /
 * Function: Login/Landing Page
 */
router.get('/', (req,res) => {
    res.send('Login')
})


/** 
 * GET /dashboard
 * Function: Dashboard
 */
router.get('/dashboard', (req,res) => {
    res.send('Dashboard')
})


module.exports = router;