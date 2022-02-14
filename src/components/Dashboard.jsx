import React, {  useState, useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';

const importView = (layout) =>
  React.lazy(() => import("./"+layout).catch((e) => import('./Layout')));

const Dashboard = () => {
  const [views, setViews] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
  
      let layout =currentUser ? currentUser.layout:"Layout";
  async function loadViews() {
          const View = await importView(layout);
      Promise.resolve(<View />).then(setViews);
    }
   loadViews();
  }, [currentUser]);

  return (
    <React.Suspense fallback="Loading views...">
      <div className="container">{views}</div>
    </React.Suspense>
  );
};

export default Dashboard;
