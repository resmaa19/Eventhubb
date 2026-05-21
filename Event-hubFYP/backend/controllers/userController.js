import User from "../models/User.js";


// Controller function to handle user registration
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

    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.error('Incorrect password for user:', user.username); // Log the username
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // User authenticated, respond with user data or token, including role
    res.status(200).json({ success: true, message: 'Successfully logged in', data: { username: user.username, role: user.role, email: user.email, id: user._id } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};


// Controller function to retrieve user profile
export const getUserProfile = async (req, res) => {
  try {
      const userId = req.user.id; // Assuming user is authenticated and user data is available in request

      // Fetch user profile data
      const userProfile = await User.findById(userId);

      if (!userProfile) {
          return res.status(404).json({ message: 'User profile not found' });
      }

      // Return user profile
      res.status(200).json({ userProfile });
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


// Controller function to update user profile
export const updateUserProfile = async (req, res) => {
  try {
      const userId = req.user.id; // Assuming user is authenticated and user data is available in request
      const { username, email, password } = req.body;

      // Find user by ID and update profile data
      const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User profile updated successfully', updatedUser });
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


//controller function to getSingleUser 
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
      const user = await User.findById(id);

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, message: "User found", data: user });
  } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

  


// Controller function to delete user profile
export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user is authenticated and user data is available in request

    // Delete user by ID
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
