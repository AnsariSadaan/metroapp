import express from 'express';
import authToken from '../middleware/authToken.js';
import userLogout from '../controller/userLogout.js';
import getStations  from '../controller/stationController.js'
import userLogin from '../controller/userLogin.js';
import userRegister from '../controller/userRegister.js';
import { purchaseTicket } from '../controller/ticketController.js';
import initiatePayment from '../controller/initiatePayment.js';
import { getUserProfile } from '../controller/user.controller.js';
import { verifyPayment } from '../controller/paymentController.js';
const router = express.Router();

router.get('/', getStations);
router.post('/issue-ticket', authToken, purchaseTicket);
router.post('/register', userRegister);
router.post('/login', userLogin)
router.post('/initiate', initiatePayment);
router.post('/logout', authToken, userLogout);
router.get('/profile', authToken, getUserProfile);
router.post('/payments/verify/:paymentId', verifyPayment);


export default router;