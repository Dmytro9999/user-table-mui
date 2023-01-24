import React from 'react'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {

	return (
			<div
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<h1>404</h1>
				<h4>Sorry, page not found</h4>
				<div>
					<Link to='/users'>
						Back to Home
					</Link>
				</div>
			</div>
	)
}

export default NotFoundPage
