import User from '../Model/User.js';


export const deleteUser = async (req, res) => {

    try {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User deleted successfully")
        }
    
        return res.status(500).json("Cannot delete this user");
    } catch (error) {
        return res.status(500).json(error.message);
    }
      
}


export const updateUser = async (req, res) => {

    try {
        if (req.user.id === req.params.id) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            return res.status(200).json(updatedUser)
        }
    
        return res.status(500).json("Cannot update user");
    } catch (error) {
        return res.status(500).json(error.message);
    }
      
}


export const getUser = async (req, res) => {

    try {
       const user = await User.findById(req.params.id);
       return res.status(200).json(user);
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
      
}

export const getUsers = async (req, res) => {

    try {
        if (req.user.isAdmin) {
            const users = await User.find();
            return res.status(200).json(users);
        }
        return res.status(404).json("You do not have permission to access this endpoint");
        
    } catch (error) {
        return res.status(500).json(error);
    }
      
};

export const getFewUsers = async (req, res) => {

    try {
        if (req.user.isAdmin) {
            const users = await User.find().limit(5);
            return res.status(200).json(users);
        }
        return res.status(404).json("You do not have permission to access this endpoint");

    } catch (error) {
        return res.status(500).json(error);
    }

};

export const getUserStat = async(req, res) => {
    if (req.user.isAdmin) {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        // var startYear = new Date(new Date().getMonth(), 0, 1); // 01/01/2023

        try {
            const user = await User.aggregate([
                {$match: {createdAt: {$gte: lastYear}}},
                {$project: {month: {$month: '$createdAt'}}},
                {$group: {
                    _id: '$month',
                    total: {$sum:1}
                }},
                {$sort: {'_id': 1}}
            ]).sort({createdAt: 1})

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(500).json("Unauthorized endpoint");
    }
    
}


