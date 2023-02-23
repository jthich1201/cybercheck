import Router from 'express-promise-router';
const router = Router();

const { GetAllComments, PostNewComment, addCommentController } = require("../controllers/CommentController");


router.get('/', GetAllComments);

router.post('/', PostNewComment);

router.post("/", addCommentController);


module.exports = router;