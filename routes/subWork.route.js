const express = require('express');
const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware')

const subWorkController = require('../controllers/subWork.controller');
const subWorkValidator = require('../middlewares/subWork.validator');

const router = express.Router(protect);


router.post('/sub-works', validate(subWorkValidator), auth, subWorkController.createSubWork);
router.get('/sub-works', auth, subWorkController.getSubWorks);
router.get('/sub-works/:id', auth, subWorkController.getSubWork);
router.put('/sub-works/:id', auth, subWorkController.updateSubWork);
router.delete('/sub-works/:id', auth, subWorkController.deleteSubWork);

module.exports = router;