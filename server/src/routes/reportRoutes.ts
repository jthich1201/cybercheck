import Router from 'express-promise-router';
import { ReportController } from '../controllers';
const router = Router();



router.post( '/createReport', ReportController.createReport); // SaveUsers is a function in UserController.ts
router.get('/g etReports/:userId', ReportController.getReports);


// router.post( '/saveChanges', ReportController.saveChanges); // SaveUsers is a function in UserController.ts

module.exports = router;