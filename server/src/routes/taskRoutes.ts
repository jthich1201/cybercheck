import Router from 'express-promise-router';
import { TaskController } from '../controllers';
const router = Router();



router.post('/createTask', TaskController.createTask);
router.get("/", TaskController.getTask)



module.exports = router;