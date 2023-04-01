import Router from 'express-promise-router';
import { PromptController } from '../controllers';
const router = Router();



router.post('/createPrePrompt', PromptController.createPrePrompt); // SaveUsers is a function in UserController.ts
router.get('/getPrePrompt', PromptController.getPrePrompts);
router.put('/updatePrePrompt/:id', PromptController.updatePrePrompt);
router.delete('/deletePrePrompt/:id', PromptController.deletePrePrompt);
router.post('/createPrePromptOptions', PromptController.createPrePromptOptions);
router.get('/getPrePromptOptions/:prePromptId', PromptController.getPrePromptOptions);
router.put('/updatePrePromptOptions/:optionId', PromptController.updatePrePromptOptions);
router.delete('/deletePrePromptOptions/:optionId', PromptController.deletePrePromptOptions);
router.post('/createIncidentResponse', PromptController.createIncidentResponse);
router.get('/getIncidentResponses', PromptController.getIncidentResponses);
router.put('/updateIncidentResponse/:id', PromptController.updateIncidentResponse);
router.delete('/deleteIncidentResponse/:id', PromptController.deleteIncidentResponse);
router.post('/createPrompt', PromptController.createPrompt);
router.get('/getPrompts/:incidentResponseId', PromptController.getPrompts);
router.put('/updatePrompt/:id', PromptController.updatePrompt);
router.delete('/deletePrompt/:id', PromptController.deletePrompt);
router.get('/getSeverityLevel', PromptController.getSeverityLevels);
router.put('/updateSeverityLevel/:id', PromptController.updateSeverityLevel);
module.exports = router;