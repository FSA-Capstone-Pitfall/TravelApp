import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './components/LandingPage/Home';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';
import Destination from './features/destinations';
import SingleDestination from './features/singleDestination';
import AllUsers from './components/users/allUsers';
import UserAccount from './components/users/userAccount';
import UserProfile from './components/users/userProfile';

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getUserByToken());
    }
  }, []);

  return !user ? (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  ) : (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/destinations' element={<Destination />} />
      <Route path='/destinations/:location' element={<SingleDestination />} />
      <Route path='/users/:userId/calendar' element={<Destination />} />
      <Route exact path='/users/all' element={<AllUsers />} />
      <Route exact path='/users/account/:userId' element={<UserAccount />} />
      <Route exact path='/users/profile/:userId' element={<UserProfile />} />
    </Routes>
  );
};

export default Router;
