import  Router from 'express-promise-router';
import passport from 'passport';

const router = Router();

// Define SSO endpoints
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

router.get('/auth/outlook', passport.authenticate('outlook', { scope: ['profile', 'email'] }));
router.get('/auth/outlook/callback', passport.authenticate('outlook', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

export default router;