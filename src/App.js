import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';  
import { UserProvider } from './context/UserContext'; 

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
