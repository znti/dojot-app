import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({authenticated, component, render, ...rest}) => {
		let Component = component;
		if(render) {
			
			return(
				<Route 
					{...rest}
					render={(props) => {
						return (
							authenticated ?
								render(props)
							:
								<Redirect to='/'/>
						);
					}}
				/>
			);
		}
		return(
			<Route 
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
		);
	}

export default PrivateRoute;
