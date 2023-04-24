import Router from 'express-promise-router';
import { TaskController } from '../controllers';
const router = Router();



router.post('/createTask', TaskController.createTask);
router.get("/getTask/:report_id", TaskController.getTask)
router.post('/setTaskCompleted', TaskController.setTaskCompleted);



module.exports = router;