import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

const VendorManagement = () => {
  const [vendorData, setVendorData] = useState({ name: '', email: '', phone: '', address: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/vendors/add`, vendorData);
      console.log('Vendor added successfully:', response.data);
      // Reset form fields
      setVendorData({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  return (
    <div className='vendor-management'>
      <h2>Add Vendor</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Name' value={vendorData.name} onChange={handleChange} />
        <input type='email' name='email' placeholder='Email' value={vendorData.email} onChange={handleChange} />
        <input type='text' name='phone' placeholder='Phone' value={vendorData.phone} onChange={handleChange} />
        <input type='text' name='address' placeholder='Address' value={vendorData.address} onChange={handleChange} />
        <button type='submit'>Add Vendor</button>
      </form>
    </div>
  );
};

export default VendorManagement;
