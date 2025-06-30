import express from 'express';

import {registerUser, getAllUsers, getUserById, loginUser} from '../controller/authController.js';


const router = express.Router();


router.post('/register', registerUser);
router.get('/register', getAllUsers);
router.get('/register/:id', getUserById);
router.post('/login', loginUser);

export default router;