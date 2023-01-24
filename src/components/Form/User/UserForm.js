import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {toast} from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import {isEmpty} from 'lodash';
import $api from '../../../helpers/api_helper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {LoadingButton} from '@mui/lab';

const UserForm = ({ user }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [userData, setUserData] = useState({})
	const [isLoading, setIsLoading]=useState(false)

	useEffect(() => {
		setUserData(user)
	}, [user])

	const validationSchema = yup.object({
		email: yup
			.string('Enter your email')
			.email('Enter a valid email')
			.required('Email is required'),
		name: yup
			.string('Enter your name')
			.required('Name is required'),
		status: yup.string().required('Select user status'),
	})

	const onSubmit = async (values) => {
		try {
			setIsLoading(true)

			await $api.put(
				`${process.env.REACT_APP_API_URL}/public/v2/users/${id}`,
				{
					email: values.email,
					name: values.name,
					status: values.status,
				}
			)

			navigate('/users')
			toast.success('User successfully edited')
		} catch (e) {
			setIsLoading(false)
			toast.error(e.message)
		}
	}

	const formik = useFormik({
		initialValues: {
			email: userData.email,
			name: userData.name,
			status: userData.status,
		},
		validationSchema,
		onSubmit,
		enableReinitialize: true,
	})

	const userStatus = [
		{
			value: 'active',
			label: 'Active',
		},
		{
			value: 'inactive',
			label: 'Inactive',
		},
	]

	return (
		<div>
			<Grid container alignItems='center' justify='center' direction='column'>
			{!isEmpty(userData) ?
				<>
					<form onSubmit={formik.handleSubmit} >

							<Grid mb={2}>
								<TextField
									fullWidth
									id='email'
									name='email'
									value={formik.values?.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</Grid>
							<Grid mb={2}>
								<TextField
									fullWidth
									id='name'
									name='name'
									value={formik.values?.name}
									onChange={formik.handleChange}
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
								/>
							</Grid>

							<Grid mb={2}>
								<FormControl>
									<InputLabel htmlFor='agent-simple'>Gender</InputLabel>
									<Select disabled={true} value={userData?.gender}>
										<MenuItem value='male'>Male</MenuItem>;
										<MenuItem value='female'>Female</MenuItem>;
									</Select>
								</FormControl>
							</Grid>

							<Grid mb={2}>
								<TextField
									select
									id='status'
									value={formik.values?.status || ''}
									onChange={formik.handleChange('status')}
									helperText={
										formik.touched.status ? formik.errors.status : ''
									}
									error={
										formik.touched.status && Boolean(formik.errors.status)
									}
									margin='dense'
									variant='outlined'
									fullWidth>
									{userStatus.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>

							<LoadingButton
								color='primary'
								variant='contained'
								loading={isLoading}
								type='submit'>
								Submit
							</LoadingButton>
					</form>
				</>
				:

				<Box sx={{ display: 'flex' }}>
					<CircularProgress />
				</Box>
			}
			</Grid>
		</div>
	)
}

export default UserForm
