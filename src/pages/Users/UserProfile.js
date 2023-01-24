import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserForm from '../../components/Form/User'
import { toast } from 'react-toastify'
import $api from '../../helpers/api_helper';
import {Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {isEmpty} from 'lodash';

const UserProfile = () => {

	const { id } = useParams()
	const [user, setUser] = useState(null)

	useEffect(() => {

		$api.get(`${process.env.REACT_APP_API_URL}/public/v2/users/${id}`)
			.then((res) => {
				setUser(res.data)
			})
			.catch((error) => {
				toast.error(error.message)
			})
	}, [])

	return (
		<div>
			{
				isEmpty(user) ?
					<Box sx={{ display: 'flex', justifyContent:'center'}}>
						<CircularProgress />
					</Box>
					:
				<>
				<Typography align="center" variant="h4" m={2}>Edit user form</Typography>
				<UserForm user={user} />
				</>
			}

		</div>
	)
}

export default UserProfile
