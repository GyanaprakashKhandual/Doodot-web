const express = require('express');

const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware')


const workController = require('../controllers/work.controller');
const workValidator = require('../middlewares/work.validator');

const router = express.Router(protect);

// Work Routes
router.post('/works', validate(workValidator), auth, workController.createWork);
router.get('/works', auth, workController.getWorks);
router.get('/works/:id', auth, workController.getWork);
router.put('/works/:id', auth, workController.updateWork);
router.delete('/works/:id', auth, workController.deleteWork);


module.exports = router;