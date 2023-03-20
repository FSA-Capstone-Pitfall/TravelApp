import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './components/LandingPage/Home';
import SignInSide from './components/LandingPage/SignIn';
import SignUp from './components/LandingPage/SignUp';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';
import Destinations from './components/pages/destinations';
import SingleDestination from './features/singleDestination';
import MyTrip from './features/itinerary';

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getUserByToken());
    }
  }, []);

  return (
    <div style={{ marginTop: '-9vh' }}>
      {
        !user ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/login" element={<SignInSide />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/destinations" element={<Destinations />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:location" element={<SingleDestination />} />
            <Route path="/mytrips" element={<MyTrip />} />
          </Routes>
        )
      }
    </div>
  );
};

export default Router;
