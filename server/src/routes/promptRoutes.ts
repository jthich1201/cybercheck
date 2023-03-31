import Router from 'express-promise-router';
import { PromptController } from '../controllers';
const router = Router();



router.post('/createPrePrompt', PromptController.createPrePrompt); // SaveUsers is a function in UserController.ts
router.get('/getPrePrompt', PromptController.getPrePrompts);
router.post('/createPrePromptOptions', PromptController.createPrePromptOptions);
router.get('/getPrePromptOptions/:prePromptId', PromptController.getPrePromptOptions);
router.post('/createIncidentResponse', PromptController.createIncidentResponse);
router.get('/getIncidentResponse', PromptController.getIncidentResponse);
router.post('/createPrompt', PromptController.createPrompt);
router.get('/getPrompts/:incidentResponseId', PromptController.getPrompts);
// router.post( '/saveChanges', ReportController.saveChanges); // SaveUsers is a function in UserController.ts

module.exports = router;