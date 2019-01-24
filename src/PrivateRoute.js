import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({authenticated, component, ...rest}) => {
		let Component = component;
		return <Route 
			{...rest}
			render={(props) => {
				return (
					authenticated ?
						<Component {...props}/>
					:
						<Redirect to='/'/>
				);
			}}
		/>
	}

export default PrivateRoute;
