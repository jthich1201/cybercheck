import Router from 'express-promise-router';
const router = Router();

const { addDescriptionController } = require("../controllers/DescriptionController");

router.post("/", addDescriptionController);

module.exports = router;