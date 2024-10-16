import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AddUser = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [employeeid, setEmployeeid] = useState('');
  const [roleid, setRoleid] = useState('');
  const [departmentid, setDepartmentid] = useState('');
  const [active, setActive] = useState(false);

  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const userData = {
      firstname,
      lastname,
      employeeid,
      roleid: parseInt(roleid),  
      departmentid: parseInt(departmentid), 
      active: active ? 1 : 0  
    };

    try {
      await addUser(userData);  
      navigate('/'); 
    } catch (error) {
      console.error('Failed to create user:', error.response || error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Create New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-gray-700">First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="employeeid" className="block text-gray-700">Employee ID</label>
          <input
            type="text"
            id="employeeid"
            value={employeeid}
            onChange={(e) => setEmployeeid(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roleid" className="block text-gray-700">Role ID</label>
          <input
            type="text"
            id="roleid"
            value={roleid}
            onChange={(e) => setRoleid(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="departmentid" className="block text-gray-700">Department ID</label>
          <input
            type="text"
            id="departmentid"
            value={departmentid}
            onChange={(e) => setDepartmentid(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="active" className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={() => setActive(!active)}
              className="mr-2"
            />
            Active
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
          Create User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
