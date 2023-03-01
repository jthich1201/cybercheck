import Router from 'express-promise-router';
const router = Router();

const { GetAllComments, addCommentController } = require("../controllers/CommentController");


router.get('/', GetAllComments);

router.post("/", addCommentController);


module.exports = router;