import React from 'react';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Sweets from './components/Sweets';
import AddSweet from './components/AddSweet';
import Footer from './components/Footer';
import RestockSweets from './components/RestockSweet';
import PurchaseSweets from './components/PurchaseSweet';
import PrivateComponent from './components/PrivateComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>


          {/* <Route element={<PrivateComponent />}> */}
          <Route element={<PrivateComponent><Sweets /></PrivateComponent>} path="/" />
          <Route element={<PrivateComponent><AddSweet /></PrivateComponent>} path="/add-sweet" />
          <Route element={<PrivateComponent><RestockSweets /></PrivateComponent>} path="/sweets/restock" />
          <Route element={<PrivateComponent><PurchaseSweets /></PrivateComponent>} path="/sweets/purchase" />
          <Route path="/logout" element={<h1>Logout</h1>} />
          {/* </Route> */}
          <Route path="/register" element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        <Footer></Footer>

      </BrowserRouter>
    </div>
  );
}

export default App;
