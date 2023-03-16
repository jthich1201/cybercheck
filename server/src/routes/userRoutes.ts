import Router from 'express-promise-router';
import { UserController } from '../controllers';
const router = Router();

router.get('/', UserController.GetAllUsers);
router.post( '/saveUsers', UserController.SaveUsers); // SaveUsers is a function in UserController.ts


module.exports = router;