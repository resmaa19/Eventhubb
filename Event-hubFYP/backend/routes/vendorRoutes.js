import express from 'express';
import { addVendor, deleteVendorById, getAllVendors, updateVendorById } from '../controllers/vendorController.js';

const vendorRoutes = express.Router();
vendorRoutes.get('/', getAllVendors);
vendorRoutes.post('/', addVendor);
vendorRoutes.delete('/:id', deleteVendorById);
vendorRoutes.put('/:id', updateVendorById);

export default vendorRoutes;
