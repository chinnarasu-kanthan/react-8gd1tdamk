import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Layout = (authUser) => {

  let { user: currentUser } = useSelector((state) => state.auth);
  
  return (
    <div className="container">
      <div className="card card-container">
        <header className="jumbotron">
          <h3>
            <strong>Profile</strong> 
          </h3>
        </header>
        <p>
          <strong>First Name:{currentUser.firstName}</strong>
        </p>
        <p>
          <strong>Last Name:{currentUser.lastName}</strong>
        </p>
        <p>
          <strong>Email:{currentUser.username}</strong>
        </p>
    
      </div>
    </div>
  );
};



export default Layout

