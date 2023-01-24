import React from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NotificationBox = () => {

	return (
		<ToastContainer autoClose={4000}
										enableMultiContainer
										className='toast-position'
		/>
	)
}


export default NotificationBox;
