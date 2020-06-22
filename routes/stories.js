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

/** 
 * GET /stories
 * Function: Show All Stories
 */
router.get('/', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({ status: 'public'}).populate('user').sort({ createdAt : 'desc'}).lean();
        res.render('stories/index', {
            stories
        })    
    } catch(e) {
        console.error(e);
        res.render('error/500');
    }
})


/** 
 * Get /stories/edit/:id
 * Function: Edit Story
 */
router.get('/edit/:id', ensureAuth, async (req,res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id}).lean();
        if(!story){
            return res.render('error/404');
        }

        if(story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', {
                story
            })
        }

    } catch(e) {
        console.error(e);
        res.render('errors/500');
    }
})


/** 
 * PUT /stories/:id
 * Function: Update Story
 */
router.put('/:id', ensureAuth, async (req,res) => {
    try {
        let story = await Story.findOne({ _id: req.params.id}).lean();
        
        if(!story){
            return res.render('error/404');
        }

        if(story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            story = await Story.findOneAndUpdate({ _id : req.params.id }, req.body, {
                new: true,
                runValidators: true
            })

            res.redirect('/dashboard');
        }

    } catch(e) {
        console.error(e);
        res.render('errors/500');
    }
})


/** 
 * DELETE /stories/:id
 * Function: DELETE Story
 */
router.delete('/:id', ensureAuth, async (req,res) => {
    try {
        await Story.remove({ _id: req.params.id});
        res.redirect('/dashboard');
        
    } catch(e) {
        console.error(e);
        res.render('errors/500');
    }
})

module.exports = router;