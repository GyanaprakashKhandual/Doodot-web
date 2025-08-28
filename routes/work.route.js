const express = require('express');
const {
    getWork,
    getWorks,
    createWork,
    updateWork,
    deleteWork
} = require('../controllers/work.controller');

const protect = require('../middlewares/auth.middleware');


const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

router.route('/')
    .get(getWorks)
    .post(createWork);

router.route('/:id')
    .get(getWork)
    .put(updateWork)
    .delete(deleteWork);

module.exports = router;