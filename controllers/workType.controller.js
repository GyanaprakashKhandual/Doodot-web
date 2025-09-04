const WorkType = require('../models/workType.model');
const Work = require('../models/work.model');
const SubWork = require('../models/subWork.model');

// Create WorkType
exports.createWorkType = async (req, res) => {
    try {
        const { workTypeName, workTypeDesc } = req.body;
        
        const workType = new WorkType({
            user: req.user.id,
            workTypeName,
            workTypeDesc
        });
        
        const savedWorkType = await workType.save();
        res.status(201).json(savedWorkType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all WorkTypes for a user
exports.getWorkTypes = async (req, res) => {
    try {
        const workTypes = await WorkType.find({ user: req.user.id });
        res.json(workTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single WorkType
exports.getWorkType = async (req, res) => {
    try {
        const workType = await WorkType.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });
        
        if (!workType) {
            return res.status(404).json({ message: 'WorkType not found' });
        }
        
        res.json(workType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update WorkType
exports.updateWorkType = async (req, res) => {
    try {
        const { workTypeName, workTypeDesc } = req.body;
        
        const workType = await WorkType.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { workTypeName, workTypeDesc },
            { new: true, runValidators: true }
        );
        
        if (!workType) {
            return res.status(404).json({ message: 'WorkType not found' });
        }
        
        res.json(workType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete WorkType and all associated Works and SubWorks
exports.deleteWorkType = async (req, res) => {
    try {
        const workType = await WorkType.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });
        
        if (!workType) {
            return res.status(404).json({ message: 'WorkType not found' });
        }
        
        // Find all works associated with this workType
        const works = await Work.find({ workType: req.params.id });
        
        // Get all work IDs to delete associated subWorks
        const workIds = works.map(work => work._id);
        
        // Delete all subWorks associated with these works
        await SubWork.deleteMany({ work: { $in: workIds } });
        
        // Delete all works associated with this workType
        await Work.deleteMany({ workType: req.params.id });
        
        // Finally delete the workType
        await WorkType.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'WorkType and all associated data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};