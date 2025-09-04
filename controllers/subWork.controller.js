const SubWork = require('../models/subWork.model');

// Create SubWork
exports.createSubWork = async (req, res) => {
    try {
        const {
            workType,
            work,
            subWorkName,
            subWorkDesc,
            startDate,
            endDate,
            subWorkLink,
            status
        } = req.body;
        
        const subWork = new SubWork({
            user: req.user.id,
            workType,
            work,
            subWorkName,
            subWorkDesc,
            startDate,
            endDate,
            subWorkLink,
            status
        });
        
        const savedSubWork = await subWork.save();
        
        // Populate related data in response
        await savedSubWork.populate('workType', 'workTypeName workTypeDesc');
        await savedSubWork.populate('work', 'workName workDesc');
        
        res.status(201).json(savedSubWork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all SubWorks for a user (with optional work and workType filters)
exports.getSubWorks = async (req, res) => {
    try {
        let filter = { user: req.user.id };
        
        // If work query parameter is provided, filter by work
        if (req.query.work) {
            filter.work = req.query.work;
        }
        
        // If workType query parameter is provided, filter by workType
        if (req.query.workType) {
            filter.workType = req.query.workType;
        }
        
        const subWorks = await SubWork.find(filter)
            .populate('workType', 'workTypeName workTypeDesc')
            .populate('work', 'workName workDesc');
        
        res.json(subWorks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single SubWork
exports.getSubWork = async (req, res) => {
    try {
        const subWork = await SubWork.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        })
        .populate('workType', 'workTypeName workTypeDesc')
        .populate('work', 'workName workDesc');
        
        if (!subWork) {
            return res.status(404).json({ message: 'SubWork not found' });
        }
        
        res.json(subWork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update SubWork
exports.updateSubWork = async (req, res) => {
    try {
        const {
            subWorkName,
            subWorkDesc,
            startDate,
            endDate,
            subWorkLink,
            status
        } = req.body;
        
        const subWork = await SubWork.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            {
                subWorkName,
                subWorkDesc,
                startDate,
                endDate,
                subWorkLink,
                status
            },
            { new: true, runValidators: true }
        )
        .populate('workType', 'workTypeName workTypeDesc')
        .populate('work', 'workName workDesc');
        
        if (!subWork) {
            return res.status(404).json({ message: 'SubWork not found' });
        }
        
        res.json(subWork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete SubWork
exports.deleteSubWork = async (req, res) => {
    try {
        const subWork = await SubWork.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });
        
        if (!subWork) {
            return res.status(404).json({ message: 'SubWork not found' });
        }
        
        await SubWork.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'SubWork deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};