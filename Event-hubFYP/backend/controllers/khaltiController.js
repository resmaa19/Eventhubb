import axios from 'axios';

// Controller function to initiate Khalti payment
export const initiatePayment = async (req, res) => {
  try {
    // Extract payment data from the request body
    const paymentData = req.body;

    // Make a POST request to Khalti API for payment initiation
    const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', paymentData, {
      headers: {
        'Authorization': `aa0be78bee1845d586f9fb1dafedb0cd`,
        'Content-Type': 'application/json',
      },
    });

    // Send the response data back to the client
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to handle Khalti payment callback
export const handleCallback = async (req, res) => {
  try {
    // Extract payment status and transaction ID from the callback request
    const { status, txn_id, bookingId } = req.body;

    // Check if the payment was successful
    if (status === 'Completed') {
      // Find the booking in the database
      const booking = await booking.findById(bookingId);

      // If the booking is not found or it's already paid, return an error
      if (!booking || booking.status === 'paid') {
        return res.status(400).json({ error: 'Invalid booking or booking is already paid' });
      }

      // Update the booking status to 'paid' and store the transaction ID
      booking.status = 'paid';
      booking.transactionId = txn_id;
      await booking.save();

      // Redirect to the thank you page
      return res.redirect("http://localhost:3000/thank-you");
    } else {
      // If the payment was not successful, handle the error accordingly
      return res.status(400).json({ error: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
    
