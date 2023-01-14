import Teaching from '../Model/Teachings.js';
import User from '../Model/User.js';
import mailgun from 'nodemailer-mailgun-transport';
import nodemailer from 'nodemailer';
import Teachings from '../Model/Teachings.js';


export const createTeaching = async (req, res) => {
    const author = await User.findById(req.user.id);
    try {
        const teaching = await Teaching.create({userId:req.user.id, author:author.username, ...req.body});
        return res.status(200).json(teaching);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


export const deleteTeaching = async (req, res) => {
    const Author = await Teaching.findById(req.params.id)
    try {
        if (req.user.id === Author.userId || req.user.isAdmin ) {
            await Teaching.findByIdAndDelete(req.params.id);
            return res.status(200).json('Post deleted');
        } else {
            return res.status(500).json('Unauthorized to delete post');
        }
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
      
}


export const updateTeaching = async (req, res) => {
    const Author = await Teaching.findById(req.params.id)
    try {
        if (req.user.id === Author.userId || req.user.isAdmin ) {
            const updateTeaching = await Teaching.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
            return res.status(200).json(updateTeaching); 
        } else {
            return res.status(500).json('Unauthorized to update post'); 
        }
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
      
}


export const getTeaching = async (req, res) => {
    try {

        const teaching = await Teaching.findById(req.params.id);
        await Teaching.findByIdAndUpdate(req.params.id, {$inc: {views: 1}})
        return res.status(200).json(teaching);

    } catch (error) {
        return res.status(500).json(error.message);
    }
      
}


export const getTeachings = async (req, res) => {
    const items_per_page = 6
    const page = req.query.page || 1
    // const query = {}

    try {
        const skip = (page - 1) * items_per_page;
        const count = await Teaching.estimatedDocumentCount()
        const items = await Teaching.find().limit(items_per_page).skip(skip).sort({createdAt: -1});
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

export const getDashboardTeachings = async(req, res) => {
    try {
        const teachings = await Teachings.find().sort({createdAt: 'desc'});
        return res.status(200).json(teachings);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


export const likeTeaching = async (req, res) => {
    const teaching = await Teaching.findById(req.params.id);
    try {
        if (!teaching.like.includes(req.user.id)) {
            const likeTeaching = await Teaching.findByIdAndUpdate(req.params.id, {$push: {like: req.user.id}}, {new:true});
            await Teaching.findByIdAndUpdate(req.params.id, {$inc: {likeCount: 1}})
            return res.status(200).json(likeTeaching);  
        }
        else {
            const dislikeTeaching = await Teaching.findByIdAndUpdate(req.params.id, {$pull: {like: req.user.id}}, {new:true});
            await Teaching.findByIdAndUpdate(req.params.id, {$inc: {likeCount: -1}})
            return res.status(200).json(dislikeTeaching); 
        }
       
    } catch (error) {
        return res.status(500).json(error.message);
    }
      
};


export const getTrending = async (req, res) => {
    try {
        const teachings = await Teaching.find().sort({views: -1}).limit(5);
        return res.status(200).json(teachings);
    } catch (error) {
        return res.status(500).json(error.message);
    }
      
};


export const getRandom = async (req, res) => {
    try {
        const random_teachings = await Teaching.aggregate([{$sample: {size: 3}}]);
        return res.status(200).json(random_teachings);
    } catch (error) {
        return res.status(500).json(error.message);
    }  
};


export const searchTeaching = async (req, res) => {
    const search = req.query.q;
    try {
       const searchResult = await Teaching.find({title :{$regex: search, $options: 'i'}});
       return res.status(200).json(searchResult)
    } catch (error) {
        return res.status(500).json(error.message);
    }  
};



export const sendMessage = async (req, res) => {
    try {
        const auth = {
            auth: {
                api_key: process.env.MAILGUN_API,
                domain: process.env.MAILGUN_DOMAIN
            }
        }

        let transporter = nodemailer.createTransport(mailgun(auth));

        const mailOptions = {
            from: req.body.email,
            to: 'kennethrockson026@gmail.com',
            subject: `The Christians - message from ${req.body.name}`,
            text: req.body.message
        }

        transporter.sendMail(mailOptions , (err, info) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).json('Email sent successfully');
            }
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }  
};

export const getPostStats = async(req, res) => {
    if (req.user.isAdmin) {
        const date = new Date();

        const lastMonth = new Date(date.setMonth(date.getMonth() - 1)) // 12/2022
        const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1)) // 11/2022
        // var startYear = new Date(new Date().getFullYear(), 0, 1); // 01/01/2023

        try {
            const data = await Teaching.aggregate([
                {$match: {createdAt: {$gte: prevMonth}}},
                {$project: {month: {$month: '$createdAt'}}},
                {$group: {
                    _id: '$month',
                    total: {$sum:1}
                }},
                {$sort: {'_id': 1}}
            ])
            
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } else {
        return res.status(500).json("Unauthorized endpoint");
    }
}


