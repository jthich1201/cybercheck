import Router from 'express-promise-router';
import { PromptController } from '../controllers';
const router = Router();



router.post('/createPrePrompt', PromptController.createPrePrompt); // SaveUsers is a function in UserController.ts
router.get('/getPrePrompt', PromptController.getPrePrompts);
router.put('/updatePrePrompt', PromptController.createPrePrompt);
router.delete('/deletePrePrompt/:prePromptId', PromptController.deletePrePrompt);
router.post('/createPrePromptOptions', PromptController.createPrePromptOptions);
router.get('/getPrePromptOptions/:prePromptId', PromptController.getPrePromptOptions);
router.put('/updatePrePromptOptions', PromptController.updatePrePromptOptions);
router.delete('/deletePrePromptOptions/:optionId', PromptController.deletePrePromptOptions);
router.post('/createIncidentResponse', PromptController.createIncidentResponse);
router.get('/getIncidentResponse', PromptController.getIncidentResponse);
router.post('/createPrompt', PromptController.createPrompt);
router.get('/getPrompts/:incidentResponseId', PromptController.getPrompts);
router.get('/getSeverityLevel', PromptController.getSeverityLevel);
router.put('/updateSeverityLevel', PromptController.updateSeverityLevel);
module.exports = router;