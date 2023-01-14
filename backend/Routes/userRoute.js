import express from 'express';
import { deleteUser, getUser, getUsers, updateUser, getFewUsers, getUserStat } from '../Controllers/userController.js';
import {verifyToken} from '../verifyToken.js';

const router = express.Router();

// Get all Users
router.get('/', verifyToken, getUsers );

// Get few Users
router.get('/few', verifyToken, getFewUsers );

// Get UserStats
router.get('/stats', verifyToken, getUserStat );

// Get User
router.get('/find/:id', getUser );

// Delete User
router.delete('/:id', verifyToken, deleteUser );

// Update User
router.put('/:id', verifyToken, updateUser );




export default router