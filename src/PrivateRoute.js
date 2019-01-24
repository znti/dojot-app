import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({authenticated, component, ...rest}) => { //({ component: Component, ...rest }) => {
		console.log('authenticated?', authenticated);
		console.log('component to render', component);
		console.log('other props on privateroute:', rest);
		
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
