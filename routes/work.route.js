const express = require('express');

const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware')


const workController = require('../controllers/work.controller');
const workValidator = require('../middlewares/work.validator');

const router = express.Router(protect);

// Work Routes
router.post('/', validate(workValidator), workController.createWork);
router.get('/', workController.getWorks);
router.get('/:id', workController.getWork);
router.put('/:id', workController.updateWork);
router.delete('/:id', workController.deleteWork);


module.exports = router;