// VendorForm.jsx

import React, { useState } from 'react';

const VendorForm = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit vendor data to backend
    console.log('Form submitted:', { name, email, phone, address, description });
  };

  return (
    <div>
      <h2>Add Vendor</h2>
      <form onSubmit={handleSubmit}>
        {/* Vendor form fields */}
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        {/* Add other form fields (email, phone, address, description) */}
        <button type="submit">Add Vendor</button>
      </form>
    </div>
  );
};

export default VendorForm;
