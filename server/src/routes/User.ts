import Router from 'express-promise-router';
const router = Router();

const { GetAllUsers } = require("../controllers/UserController");

router.get('/', GetAllUsers);

module.exports = router;