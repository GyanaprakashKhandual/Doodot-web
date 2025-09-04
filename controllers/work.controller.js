const Work = require('../models/work.model');
const SubWork = require('../models/');

// Create Work
exports.createWork = async (req, res) => {
    try {
        const {
            workType,
            workName,
            workDesc,
            startDate,
            endDate,
            workLink,
            status
        } = req.body;
        
        const work = new Work({
            user: req.user.id,
            workType,
            workName,
            workDesc,
            startDate,
            endDate,
            workLink,
            status
        });
        
        const savedWork = await work.save();
        
        // Populate workType details in response
        await savedWork.populate('workType', 'workTypeName workTypeDesc');
        
        res.status(201).json(savedWork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Works for a user (with optional workType filter)
exports.getWorks = async (req, res) => {
    try {
        let filter = { user: req.user.id };
        
        // If workType query parameter is provided, filter by workType
        if (req.query.workType) {
            filter.workType = req.query.workType;
        }
        
        const works = await Work.find(filter)
            .populate('workType', 'workTypeName workTypeDesc');
        
        res.json(works);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single Work
exports.getWork = async (req, res) => {
    try {
        const work = await Work.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        }).populate('workType', 'workTypeName workTypeDesc');
        
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }
        
        res.json(work);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Work
exports.updateWork = async (req, res) => {
    try {
        const {
            workName,
            workDesc,
            startDate,
            endDate,
            workLink,
            status
        } = req.body;
        
        const work = await Work.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            {
                workName,
                workDesc,
                startDate,
                endDate,
                workLink,
                status
            },
            { new: true, runValidators: true }
        ).populate('workType', 'workTypeName workTypeDesc');
        
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }
        
        res.json(work);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Work and all associated SubWorks
exports.deleteWork = async (req, res) => {
    try {
        const work = await Work.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });
        
        if (!work) {
            return res.status(404).json({ message: 'Work not found' });
        }
        
        // Delete all subWorks associated with this work
        await SubWork.deleteMany({ work: req.params.id });
        
        // Delete the work
        await Work.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Work and all associated subWorks deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};