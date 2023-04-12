import Router from 'express-promise-router';
import { ReportController } from '../controllers';
const router = Router();

router.post('/createReport', ReportController.createReport); // SaveUsers is a function in UserController.ts
router.get('/getReports/:userId', ReportController.getReports);

module.exports = router;