import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './components/LandingPage/Home';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';
import Destination from './features/destinations';
import SingleDestination from './features/singleDestination';
import MyTrip from './features/itinerary';
import AllUsers from './components/users/allUsers';
import UserAccount from './components/users/userAccount';
import UserProfile from './components/users/userProfile';

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn() !== undefined) {
      dispatch(getUserByToken());
    }
  }, [dispatch]);

  return !user ? (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  ) : (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/destinations' element={<Destination />} />
      <Route path='/destinations/:location' element={<SingleDestination />} />
      <Route path='/mytrips' element={<MyTrip />} />
      <Route exact path='/users/all' element={<AllUsers />} />
      <Route
        exact
        path={`/users/account/${user.id}`}
        element={<UserAccount userId={user.id} />}
      />
      <Route exact path='/users/profile/:userId' element={<UserProfile />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
};

export default Router;
