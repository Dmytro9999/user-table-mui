import React from 'react';
import {USER_EDIT, USERS} from '../../common/constant';
import Users from '../../pages/Users/Users';
import UserProfile from '../../pages/Users/UserProfile';


export const publicRoutes = [
	{
		path: USERS,
		element: <Users />,
	},
	{
		path: USER_EDIT,
		element: <UserProfile />,
	},
]
