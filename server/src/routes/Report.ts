import Router from 'express-promise-router';
const router = Router();


let commentList = [
    {
        
    }
]

router.get('/', (req,res) => {
    res.json(commentList);
});

router.post('/', (req, res) => {
    const newComment = req.body;
    commentList.push(newComment);
    res.json(commentList);

});
module.exports = router;