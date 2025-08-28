const Work = require('../models/work.model');

const getWorks = async (req, res) => {
    try {
        const works = await Work.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: works.length,
            data: works
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getWork = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);

        if (!work) {
            return res.status(404).json({
                success: false,
                message: 'Work not found'
            });
        }

        // Make sure user owns the work
        if (work.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this work'
            });
        }

        res.status(200).json({
            success: true,
            data: work
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid work ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const createWork = async (req, res) => {
    try {
        const { workName, workDesc } = req.body;

        const work = await Work.create({
            workName,
            workDesc,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            data: work
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update work
// @route   PUT /api/works/:id
// @access  Private
const updateWork = async (req, res) => {
    try {
        // First find the work to check ownership
        let work = await Work.findById(req.params.id);

        if (!work) {
            return res.status(404).json({
                success: false,
                message: 'Work not found'
            });
        }

        // Make sure user owns the work
        if (work.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this work'
            });
        }

        // Use findByIdAndUpdate for simplicity
        work = await Work.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: work
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid work ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const deleteWork = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);

        if (!work) {
            return res.status(404).json({
                success: false,
                message: 'Work not found'
            });
        }

        // Make sure user owns the work
        if (work.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this work'
            });
        }

        await Work.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Work deleted successfully',
            data: {}
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid work ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = { createWork, deleteWork, updateWork, getWorks, getWork };
