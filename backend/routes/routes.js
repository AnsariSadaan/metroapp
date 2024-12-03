import express from 'express';
import authToken from '../middleware/authToken.js';
import userLogout from '../controller/userLogout.js';
import userDashboard from '../controller/usersDashboard.js';
import userEdit from '../controller/userEdit.js';
import userDelete from '../controller/userDelete.js';

import userLogin from '../controller/userLogin.js';
import userRegister from '../controller/userRegister.js';
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin)
router.post('/logout', authToken, userLogout);
router.get('/dashboard', userDashboard);
router.post('/update', authToken, userEdit);
router.delete('/delete', authToken, userDelete);
export default router;