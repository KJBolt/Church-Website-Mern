import Video from '../model/Video.js';
import User from '../Model/User.js';


// Add Video
export const addVideo = async (req, res) => {
    const user = await User.findById(req.user.id);
    const username = user.username

    try {
        const video = new Video({userId:req.user.id, username:username, ...req.body});
        await video.save();
        res.status(200).json(video);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


// Update Video
export const updateVideo = async (req, res) => {
    try {
        const video = Video.findById(req.params.id);
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set:req.body
            }, {new:true});
            return res.status(200).json(updatedVideo);
        }  
        return res.status(401).json({message: "You can only update your video"});  
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// Delete Video
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: "Video deleted successfully"});
        }  
        return res.status(500).json({message: "You can only delete your video"});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// Get single video
export const findVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        if (video) {
            return res.status(200).json(video)
        }
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// Trending Videos
export const getTrends = async (req, res) => {
    try {
        const videos = await Video.find().sort({views: "desc"});
        return res.status(200).json(videos)
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getVideos = async (req, res) => {
    const items_per_page = 6
    const page = req.query.page || 1
    // const query = {}

    try {
        const skip = (page - 1) * items_per_page;
        const count = await Video.estimatedDocumentCount()
        const items = await Video.find().limit(items_per_page).skip(skip);
        const pageCount = count / items_per_page

        return res.send({
            pagination: {
                count,
                pageCount
            },
            items
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
      
}



// Random Videos
export const getRandom = async (req, res) => {
    try {
        const randomVideos = await Video.aggregate([{$sample:{size:10}}]);
        return res.status(200).json(randomVideos)
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// Search Video
export const search = async (req, res) => {
    try {
            const query = req.query.q;
            const videos = await  Video.find({title: {$regex:query, $options:"i"}});
            res.status(200).json(videos);

            if (!videos) {
                return res.status(404).json({message: "No result found"});
            }
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


// Like Video
export const likeVideo = async (req, res) => {
    const userId = req.user.id;
    try {
        const video = await Video.findById(req.params.id);
        if (!video.likes.includes(userId)) {
            const likeVideo = await Video.findByIdAndUpdate(req.params.id, {$push: {likes: userId}}, {new:true});
            await Video.findByIdAndUpdate(req.params.id, {$inc: {likeCount: 1}}, {new: true});
            return res.status(200).json(likeVideo);
        } else {
            const dislikeVideo = await Video.findByIdAndUpdate(req.params.id, {$pull: {likes: userId}}, {new:true});
            await Video.findByIdAndUpdate(req.params.id, {$inc: {likeCount: -1}}, {new: true});
            return res.status(200).json(dislikeVideo);
        }
    } catch (error) {
        return res.status(500).json(error.message); 
    }
}

export const getVideoStats = async(req, res) => {
    if (req.user.isAdmin) {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1))

        try {
            const data = await Video.aggregate([
                {$match: {createdAt: {$gte: prevMonth}}},
                {$project: {month: {$month: '$createdAt'}}},
                {$group: {
                    _id: '$month',
                    total: {$sum:1}
                }}
            ])
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } else {
        return res.status(500).json("Unauthorized endpoint");
    }
}
