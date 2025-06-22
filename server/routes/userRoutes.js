import express from 'express';

import { create, getAllUsers, getUserById, update, deleteUser } from '../controller/userController.js';

const router = express.Router();

router.post('/user', create);
router.get('/user', getAllUsers)
router.get('/user/:id', getUserById)
router.put('/update/user/:id', update);
router.delete('/delete/user/:id', deleteUser);
export default router;