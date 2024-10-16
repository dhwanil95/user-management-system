import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; 

const UserList = () => {
  const { users, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">User List</h1>
        <button
          onClick={() => navigate('/create-user')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create User
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
                {users.map((user) => (
                    <tr key={user.userid} className="border-b">  
                    <td className="py-4 px-6">{user.firstname} {user.lastname}</td>
                    <td className="py-4 px-6 text-right">
                        <button
                        onClick={() => navigate(`/edit-user/${user.userid}`)} 
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
                        >
                        Edit
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
