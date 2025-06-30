import express from 'express';
import authenticate from '../middleware/auth.js';

import { create, getAllUsers, getUserById, update, deleteUser } from '../controller/userController.js';

const router = express.Router();

// Protect all user routes with authentication
router.post('/user', authenticate, create);
router.get('/user', authenticate, getAllUsers);
router.get('/user/:id', authenticate, getUserById);
router.put('/update/user/:id', authenticate, update);
router.delete('/delete/user/:id', authenticate, deleteUser);

export default router;