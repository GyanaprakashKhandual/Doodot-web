const express = require('express');
const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware')

// Import controllers
const workTypeController = require('../controllers/workType.controller');

const worTypeValidator = require('../middlewares/workType.validator');

const router = express.Router(protect);




// WorkType Routes
router.post('/work-types',validate(worTypeValidator), auth, workTypeController.createWorkType);
router.get('/work-types', auth, workTypeController.getWorkTypes);
router.get('/work-types/:id', auth, workTypeController.getWorkType);
router.put('/work-types/:id', auth, workTypeController.updateWorkType);
router.delete('/work-types/:id', auth, workTypeController.deleteWorkType);

module.exports = router;