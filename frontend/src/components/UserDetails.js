import React, { useState } from 'react';
import axios from 'axios';

const UserDetails = ({ token }) => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(response.data);
    } catch (error) {
      setUserDetails(null);
      console.log(error.response?.data || 'Error fetching user details');
    }
  };

  return (
    <div>
      <h2>User Details</h2>
      <button onClick={fetchUserDetails}>Get User Details</button>
      {userDetails && (
        <div>
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
