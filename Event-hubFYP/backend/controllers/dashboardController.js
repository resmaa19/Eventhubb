import User from '../models/User.js';
import DashboardData from '../models/DashboardData.js';

// Controller function to fetch dashboard data
export const getDashboardData = async (req, res) => {
  try {
    // Retrieve the total number of users from the database
    const totalUsers = await User.countDocuments();

    // Retrieve the total number of page views from the database
    const totalPageViews = await DashboardData.findOne();

    // Send the dashboard data in the response
    res.status(200).json({ success: true, totalUsers, totalPageViews });
  } catch (error) {
    // Handle errors
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
