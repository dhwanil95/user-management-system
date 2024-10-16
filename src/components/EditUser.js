import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const EditUser = () => {
  const { users, editUser } = useContext(UserContext);
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [employeeid, setEmployeeid] = useState('');
  const [roleid, setRoleid] = useState('');
  const [departmentid, setDepartmentid] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    const user = users.find((u) => u.userid === parseInt(id));  
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmployeeid(user.employeeid);
      setRoleid(user.roleid);
      setDepartmentid(user.departmentid);
      setActive(user.active);
    }
  }, [id, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { firstname, lastname} //, employeeid, roleid, departmentid, active };
    await editUser(id, updatedData);
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-gray-700">First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="employeeid" className="block text-gray-700">Employee ID</label>
          <input
            type="text"
            id="employeeid"
            value={employeeid}
            onChange={(e) => setEmployeeid(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roleid" className="block text-gray-700">Role ID</label>
          <input
            type="text"
            id="roleid"
            value={roleid}
            onChange={(e) => setRoleid(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="departmentid" className="block text-gray-700">Department ID</label>
          <input
            type="text"
            id="departmentid"
            value={departmentid}
            onChange={(e) => setDepartmentid(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
