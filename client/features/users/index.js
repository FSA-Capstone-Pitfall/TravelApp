import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectAllUsers, fetchUsers } from '../../store/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className='container'>
      <ul className='user-list'>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}`} className='link'>
                👤 {user.firstName} {user.lastName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
