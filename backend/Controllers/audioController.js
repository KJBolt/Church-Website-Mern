import Audio from "../model/Audio.js";
import User from "../model/User.js"

export const addAudio = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const audio = await Audio.create({
            userId: user._id,
            author: user.username,
            title: req.body.title,
            img: req.body.img,
            audio: req.body.audio
        })

        return res.status(200).json(audio)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const updateAudio = async (req, res) => {
    const audio = await Audio.findById(req.params.id)
    try {
        if (req.user.id === audio.userId){
            const updateAudio = await Audio.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
            return res.status(200).json(updateAudio);
        } else {
            return res.status(500).json("Not the owner of the Audio")
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const deleteAudio = async (req, res) => {
    const audio = await Audio.findById(req.params.id)
    try {
        if (req.user.id === audio.userId){
            await Audio.findByIdAndDelete(req.params.id);
            return res.status(200).json('Audio deleted successfully');
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getAudio = async (req, res) => {
    try {
       const audio = await Audio.findById(req.params.id);
       return res.status(200).json(audio); 
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getAudios = async (req, res) => {
    try {
        const audios = await Audio.find().sort({createdAt: 'desc'});
        return res.status(200).json(audios);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const getRandomAudios = async (req, res) => {
    try {
        const audios = await Audio.aggregate([{$sample: {size: 5}}]);
        return res.status(200).json(audios);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
