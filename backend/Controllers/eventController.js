import Event from '../Model/Event.js';

export const createEvent = async (req, res) => {
    const userId = req.user.id;
    try {
        const newEvent = await Event.create({userId:userId, ...req.body});
        return res.status(200).json(newEvent)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({createdAt: 'desc'});
        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getRecentEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({createdAt: 'desc'}).limit(3);
        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json(error);
    }
};


export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        return res.status(200).json(event)
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const deleteEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    try {
        if (req.user.id === event.userId || req.user.isAdmin) {
            await Event.findByIdAndDelete(req.params.id);
            return res.status(200).json("Event deleted successfully");
        } else {
            return res.status(401).json("You are unauthorized to delete event");
        }

    } catch (error) {
        return res.status(500).json(error);
    }
};


export const updateEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    try {
        if (req.user.id === event.userId || req.user.isAdmin) {
            const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
            return res.status(200).json(updatedEvent);
        } else {
            return res.status(401).json('You are unauthorized to update event');
        }

    } catch (error) {
        return res.status(500).json(error);
    }
};
