import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/LandingPage/Home';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';
import MyTrip from './features/itinerary';
import AllTrips from './features/itinerary/allTrips';
import AllUsers from './components/users/allUsers';
import UserAccount from './components/users/userAccount';
import UserProfile from './components/users/userProfile';
import Activities from './components/pages/Activities';
import SelectedActivity from './components/pages/SelectedActivity';
import Explore from './components/pages/Explore';
import SingleItinerary from './components/pages/SingleItinerary';

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn() !== undefined) {
      dispatch(getUserByToken());
    }
  }, [dispatch]);

  const topMargin = location.pathname.startsWith('/users') ? '0px' : '-15vh';

  return (
    <div style={{ marginTop: topMargin }}>
      {!user ? (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/activities' element={<Activities />} />
          <Route
            path='/activities/:activityId'
            element={<SelectedActivity />}
          />
          <Route path='/destinations' element={<Explore />} />
          <Route
            path='/itineraries/:itineraryId'
            element={<SingleItinerary />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/activities' element={<Activities />} />
          <Route
            path='/activities/:activityId'
            element={<SelectedActivity />}
          />
          <Route path='/destinations' element={<Explore />} />
          <Route
            path='/itineraries/:itineraryId'
            element={<SingleItinerary />}
          />
          <Route path='/mytrips' element={<AllTrips />} />
          <Route exact path='/users/all' element={<AllUsers />} />
          <Route
            exact
            path={`/users/account/${user.id}`}
            element={<UserAccount userId={user.id} />}
          />
          <Route
            exact
            path='/users/profile/:userId'
            element={<UserProfile />}
          />
          <Route path='/mytrips/:tripId' element={<MyTrip />} />
          <Route path='*' element={<Home />} />
        </Routes>
      )}
    </div>
  );
};

export default Router;
