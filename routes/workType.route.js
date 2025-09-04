const express = require('express');
const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware')

const workTypeController = require('../controllers/workType.controller');

const worTypeValidator = require('../middlewares/workType.validator');

const router = express.Router(protect);


router.post('/',validate(worTypeValidator), workTypeController.createWorkType);
router.get('/', workTypeController.getWorkTypes);
router.get('/:id', workTypeController.getWorkType);
router.put('/:id', workTypeController.updateWorkType);
router.delete('/:id', workTypeController.deleteWorkType);

module.exports = router;