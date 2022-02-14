import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';
import { createBrowserHistory } from 'history';

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = useSelector((state) => state.auth);
  return isAuthenticated.isLoggedIn ? children : <Navigate to={redirectTo} />;
}

export default function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        {currentUser ? (
          <nav className="navbar navbar-expand bg-primary">
            <div className="navbar-nav mr-auto">
              <li className="nav-item ">
                <a
                  href="login"
                  className="navbar-brand pull-right"
                  onClick={logOut}
                >
                  LogOut
                </a>
              </li>
            </div>
          </nav>
        ) : (
          ' '
        )}

        <div className="container mt-3">
          <Routes>
            <Route exact path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <RequireAuth redirectTo="/login">
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </BrowserRouter>
  );
}
