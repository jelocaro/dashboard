import logo from './assets/Img/M.png'
import Read from './components/Read';
import Create from './components/Create';
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  
  /* return (
    <div className="App">
      <h1>Update User Data With API </h1>
      <table border="1" style={{ float: 'left' }}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Profile</td>
            <td>State</td>
            <td>Operations</td>
          </tr>
          {
            users.map((item, i) =>
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.profile}</td>
                <td>{item.state}</td>
                <td><button onClick={() => deleteUser(item.id)}>Delete</button></td>
                <td><button onClick={() => selectUser(i)}>Update</button></td>

              </tr>
            )
          }
        </tbody>
      </table>
      <div>
        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /> <br /><br />
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br /><br />
        <input type="text" value={profile} onChange={(e) => { setProfile(e.target.value) }} /> <br /><br />
        <input type="text" value={state} onChange={(e) => { setState(e.target.value) }} /> <br /><br />
        <button onClick={updateUser} >Update User</button>
      </div>
    </div> */
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='/read' element={<Read />} />
        </Routes>
      </Router>
  
    );
}

export default App
