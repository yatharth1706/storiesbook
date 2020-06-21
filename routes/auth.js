/** ---------- Authentication Routes ------------- */ 

/** ---------- Router Configuration  -------------- */

const express = require('express');
const passport = require('passport');
const router = express.Router();


/** 
 * GET /auth/google
 * Function: Auth with google
 */
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))


/** 
 * GET /auth/google/callback
 * Function: Google auth callback
 */
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/dashboard');
})

/** 
 * GET /auth/logout
 * Function: Logout User
 */
router.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;