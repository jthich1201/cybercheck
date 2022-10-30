import Router from 'express-promise-router';
const router = Router();

router.get('/', (req, res) => {
    res.send({data: 'user'});
});

module.exports = router;