import express from 'express';
import {
    Registerauth,
    Loginauth,
    AdminLogin,
    AdminRegister
} from '../controllers/usercontrollers.js';

const authRouter = express.Router();
authRouter.post('/signup', Registerauth);
authRouter.post('/login', Loginauth);
authRouter.post('/es_admin_signup', AdminRegister);
authRouter.post('/es_admin_login', AdminLogin);



export default authRouter;