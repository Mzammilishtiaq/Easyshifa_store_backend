import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../schema/userSchema.js';

export const Registerauth = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let NewUser = await UserSchema.findOne({ email })

        if (NewUser) return res.status(400).json({ message: `user is already exist ${email}` });

        const salt = await bcrypt.genSalt();

        const hashPassword = await bcrypt.hash(password, salt);
        NewUser = await new UserSchema({ name, email, password: hashPassword });
        await NewUser.save();
        return res.status(201).json({ message: "User is  successfull add", Data: res.send(NewUser) });
    } catch (error) {
        return res.status(500).json({ message: `Server Error ${error}` })
    }
}

export const Loginauth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const LoginUser = await UserSchema.findOne({ email });
        if (!LoginUser) {
            return res.json({ message: "User is Not Found", success: false })
        }
        const isMatch = bcrypt.compare(password, LoginUser.password)
        if (isMatch) {
            const createToken = jwt.sign({ email, password }, 'mzammil', { expiresIn: '1d' })
            return res.json({ message: "Login is successfull", success: true, Token: createToken })
        } else {
            return res.json({ message: "User is Not Found", success: false })

        }

    }
    catch (error) {
        return res.status(500).json({ message: `Server Error ${error}` })
    }
}
export const AdminRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let NewUser = await UserSchema.findOne({ email })

        if (NewUser) return res.status(400).json({ message: `user is already exist ${email}` });

        const salt = await bcrypt.genSalt();

        const hashPassword = await bcrypt.hash(password, salt);
        NewUser = await new UserSchema({ name, email, password: hashPassword, role: 'admin' });
        await NewUser.save();
        return res.status(201).json({ message: "Admin user is successfully added", Data: res.send(NewUser) });
    } catch (error) {
        return res.status(500).json({ message: `Server Error ${error}` })
    }
}
export const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const AdminUser = await UserSchema.findOne({ email });
        if (!AdminUser) {
            return res.json({ message: "User is Not Found", success: false })
        }
        const isMatch = bcrypt.compare(password, AdminUser.password)
        if (isMatch) {
            const createToken = jwt.sign({ email, password }, 'mzammil', { expiresIn: '1d' })
            return res.json({ message: "Admin Login is successfull", success: true, Token: createToken })
        } else {
            return res.json({ message: "User admin is Not Found", success: false })

        }

    }
    catch (error) {
        return res.status(500).json({ message: `Server Error ${error}` })
    }
}