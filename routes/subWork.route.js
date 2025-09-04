const express = require('express');
const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware')

const subWorkController = require('../controllers/subWork.controller');
const subWorkValidator = require('../middlewares/subWork.validator');


const router = express.Router(protect);


router.post('/', validate(subWorkValidator), subWorkController.createSubWork);
router.get('/', subWorkController.getSubWorks);
router.get('/:id', subWorkController.getSubWork);
router.put('/:id', subWorkController.updateSubWork);
router.delete('/:id', subWorkController.deleteSubWork);

module.exports = router;