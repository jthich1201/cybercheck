import Router from 'express-promise-router';
const router = Router();

const { GetAllComments, PostNewComment } = require("../controllers/CommentController");


router.get('/', GetAllComments);

router.post('/', PostNewComment);


module.exports = router;