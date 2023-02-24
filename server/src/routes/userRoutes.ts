import Router from 'express-promise-router';
import { UserController } from '../controllers';
const router = Router();

const { GetAllUsers } = require("../controllers/UserController");

router.get('/', GetAllUsers);
router.post( '/saveUsers', UserController.SaveUsers); // SaveUsers is a function in UserController.ts


module.exports = router;