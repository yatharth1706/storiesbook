/** ---------- Router Configuration  -------------- */

const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Story = require('../models/Story');

/** 
 * GET /stories/add
 * Function: Show add page
 */
router.get('/add', ensureAuth, (req,res) => {
    res.render('stories/add');
})

/** 
 * POST /
 * Function: Process add form
 */
router.post('/', ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch(e) {
        console.error(e);
        res.render('error/500');
    }
})




module.exports = router;