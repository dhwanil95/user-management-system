import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../components/tokenService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');  
      setUsers(response.data.data);  
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };
  

  const addUser = async (userData) => {
    try {
      await axiosInstance.post('/users', userData);
      fetchUsers();  // Re-fetch users after adding
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

const editUser = async (userID, updatedData) => {
    try {
      const response = await axiosInstance.patch(`/users/${userID}`, updatedData); 
      console.log('Response from update:', response.data);  
  
      if (response.data.success === 1) { 
        await fetchUsers();  
      } else {
        console.error('Update failed:', response.data.message);
      }
  
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };
  

  useEffect(() => {
    fetchUsers();  
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error, addUser, editUser, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};
