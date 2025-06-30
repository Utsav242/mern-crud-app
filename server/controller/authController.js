import Register from '../modal/register.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// Register a new user

export const registerUser = async (req, res) => {

    try{
        const { name, email, password } = req.body;

    //  Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await Register.findOne({email});
    if(existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new Register({
        name,
        email,
        password: hashedPassword
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Login user and return JWT
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET, // Use secret from .env
            { expiresIn: "1h" }
        );
        res.status(200).json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// get all users

export const getAllUsers = async (req, res) => {
    try {
        const users = await Register.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
}


// get user by id

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Register.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
}


