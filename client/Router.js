import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './components/LandingPage/Home';
import SignInSide from './components/LandingPage/SignIn';
import SignUp from './components/LandingPage/SignUp';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';
import Destination from './features/destinations';
import SingleDestination from './features/singleDestination';

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
      <Route exact path='/login' element={<SignInSide />} />
      <Route exact path='/sign-up' element={<SignUp />} />
    </Routes>
  ) : (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/destinations' element={<Destination />} />
      <Route path='/destinations/:location' element={<SingleDestination />} />
      <Route path='/users/:userId/calendar' element={<Destination />} />
    </Routes>
  );
};

export default Router;
