import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password and specified role
    const newUser = new User({ username, email, password: hashedPassword, role });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// Controller function to handle user login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if password is correct
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

    // User authenticated, respond with user data and token
    res.status(200).json({ success: true, message: 'Successfully logged in', token, data: { username: user.username, role: user.role, email: user.email, _id: user._id } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
};

// Controller function to update user profile
export const updateUserProfile = async (req, res) => {
  try {
      // const userId = req.user._id; // Assuming user is authenticated and user data is available in request
      const { username, email, _id } = req.body;

      // Find user by ID and update profile data
      const updatedUser = await User.findByIdAndUpdate(_id, { username, email }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User profile updated successfully', updatedUser });
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

