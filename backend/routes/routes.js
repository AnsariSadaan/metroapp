import express from 'express';
import authToken from '../middleware/authToken.js';
import userLogout from '../controller/userLogout.js';
import getStations  from '../controller/stationController.js'
import userLogin from '../controller/userLogin.js';
import userRegister from '../controller/userRegister.js';
import issueTicket from '../controller/ticketController.js';
import initiatePayment from '../controller/initiatePayment.js';
const router = express.Router();

router.get('/', getStations);
router.post('/issue-ticket', authToken, issueTicket);
router.post('/register', userRegister);
router.post('/login', userLogin)
router.post('/initiate', initiatePayment);
router.post('/logout', authToken, userLogout);


export default router;