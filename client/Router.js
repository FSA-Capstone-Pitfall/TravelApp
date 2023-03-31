import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './features/home';
import { fetchTrips, getUserByToken } from './store';
import { isLoggedIn } from './utils';
import {
  Activities,
  Activity,
  Explore,
  MyTrip,
  MyTrips,
  SingleItinerary,
  UserAccount,
  UserProfile,
  Users,
} from './features';

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn() !== undefined) {
      dispatch(getUserByToken());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchTrips(user.id));
    }
  }, [dispatch, user]);

  const topMargin = location.pathname.startsWith('/users') ? '0px' : '-15vh';

  return (
    <div style={{ marginTop: topMargin }}>
      {!user ? (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/activities" element={<Activities/>}/>
          <Route path="/activities/:activityId" element={<Activity/>}/>
          <Route path="/destinations" element={<Explore/>}/>
          <Route
            path="/itineraries/:itineraryId"
            element={<SingleItinerary/>}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/activities" element={<Activities/>}/>
          <Route path="/activities/:activityId" element={<Activity/>}/>
          <Route path="/destinations" element={<Explore/>}/>
          <Route
            path="/itineraries/:itineraryId"
            element={<SingleItinerary/>}
          />
          <Route path="/mytrips" element={<MyTrips/>}/>
          <Route exact path="/users/all" element={<Users/>}/>
          <Route
            exact
            path={`/users/account/${user.id}`}
            element={<UserAccount userId={user.id}/>}
          />
          <Route
            exact
            path="/users/profile/:userId"
            element={<UserProfile/>}
          />
          <Route path="/mytrips/:tripId" element={<MyTrip/>}/>
          <Route path="*" element={<Home/>}/>
        </Routes>
      )}
    </div>
  );
};

export default Router;
