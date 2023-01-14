import User from '../Model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mailgun from 'nodemailer-mailgun-transport';
import nodemailer from 'nodemailer';

const generateAccessToken = (user) => {
    return jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT, {expiresIn:'24h'})
}

const generateRefreshToken = (user) => {
    return jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT, {expiresIn:'24h'})
}

export const register = async(req, res) => {

    try {
        // Check if user already exist
        const userExist = await User.findOne({email:req.body.email});
        if (userExist) {
            return res.status(404).json({message:'User already exist'})
        }

        // Hash password
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(req.body.password, salt);

        // Create User and save to database
        const user = await User.create({username:req.body.username, password:hashPassword});

        // Generate Token
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin, email:req.body.email}, process.env.JWT, {expiresIn:'24h'});

        // Send Mail
        const auth = {
            auth: {
                api_key: process.env.MAILGUN_API,
                domain: process.env.MAILGUN_DOMAIN
            }
        }

        let transporter = nodemailer.createTransport(mailgun(auth));

        const mailOptions = {
            from: 'johnbolt651@gmail.com',
            to: req.body.email,
            subject: 'Email Verification',
            html:`<p>We are happy you signed up to the christians website. To start <br> exploring please confirm your email address</p>
            <br><a href=${`http://localhost:3000/verify/${token}`}><b>Click here to Verify</b></a>`
        }

        transporter.sendMail(mailOptions , (err, info) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).json('Email sent successfully');
            }
        })
    } catch (error) {
        return res.status(500).json(error)
    }
    
};

// Email Verification
export const verifyToken = async (req, res) => {
    const {token} = req.params

    jwt.verify(token, process.env.JWT, async(err, user) => {
        try {
            if (err) {
                return res.status(500).json('Email verification failed. Possibly Link has expired or no longer valid')
            } else {
                const getUser = await User.findById(user.id);
                await User.findByIdAndUpdate(getUser._id, {$set: {email: user.email}}, {new:true});
                const updatedUser = await User.findByIdAndUpdate(getUser._id, {$set: {verified: true}}, {new:true});
                const {password, ...others} = updatedUser._doc
                return res.status(200).json(others);
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
       
    })
}


export const login = async(req, res) => {

    try {
         // Verify email
         const user = await User.findOne({email:req.body.email});
         if (!user) {
            return res.status(404).json({message:'Email not verified or found'});
         }

         // Verify Password
         const verifyPassword = bcrypt.compareSync(req.body.password, user.password); 
         if (!verifyPassword) {
            return res.status(404).json({message:'Invalid credentials'});
         }

         const accessToken = generateAccessToken(user); 
         const refreshToken = generateRefreshToken(user); 

         const {password, ...others} = user._doc;

         return res.status(200).json({
            user:others,
            accessToken:accessToken,
            refreshToken:refreshToken
         })
    } catch (error) {
        return res.status(500).json(error.message)
    }
};

// Sign in with Google
export const googleAuth = async(req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if (user) {
            const token = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            return res.status(200).json({
                user:user,
                accessToken: token,
                refreshToken: refreshToken
            })
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            });
            const user = await newUser.save();
            const token = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);


            return res.status(200).json({
                user,
                accessToken: token,
                refreshToken: refreshToken
            })
        }

    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};


