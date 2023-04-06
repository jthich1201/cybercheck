import Router from 'express-promise-router';
const router = Router();

const { addDescriptionController, exportDescriptionController } = require("../controllers/DescriptionController");

router.post("/", addDescriptionController);
router.get("/", exportDescriptionController);

module.exports = router;