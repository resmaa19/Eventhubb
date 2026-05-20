import mongoose from 'mongoose'; 


// Define schema for dashboard data
const dashboardDataSchema = new mongoose.Schema({
  // Define schema fields
  totalUsers: {
    type: Number,
    required: true,
  },
  totalPageViews: {
    type: Number,
    required: true,
  },
  // Add more fields as needed for your dashboard data
});

// Create and export the DashboardData model
const DashboardData = mongoose.model('DashboardData', dashboardDataSchema);

export default DashboardData ;