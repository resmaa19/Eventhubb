import Vendor from "../models/Vendor.js";

export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to add a new vendor
export const addVendor = async (req, res) => {
  try {

    // Create a new vendor instance
    const newVendor = new Vendor(req.body);

    // Save the vendor to the database
    const savedVendor = await newVendor.save();

    // Respond with success message and saved vendor data
    res.status(201).json({ success: true, vendor: savedVendor });
  } catch (error) {
    // Handle errors
    console.error("Error adding vendor:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const updateVendorById = async (req, res) => {
    try {
        const updatedBooking = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Function to delete a booking by ID
export const deleteVendorById = async (req, res) => {
    try {
        const deletedBooking = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

