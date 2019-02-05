import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

import configs from './configs';


import DataHandler from './DataHandler';

import ClippedDrawer from './modules/ui/ClippedDrawer';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isResponsiveMenuOpen: false,
			authenticated: false,
			templatesHandler: {},
			devicesHandler: {},
			dataHandler: new DataHandler(),
		}
	}

	componentDidMount() {
		console.log('Initializing dojot client');
		this.state.dataHandler.ping()

		let jwt = localStorage.getItem('authToken');
		if(jwt) {
			console.log('Loaded an existing auth token:', jwt);
			this.state.dataHandler.initializeWithAuthToken(jwt).then(() => {
				console.log('Initialized datahandler with pre-existing token');
				this.setState({authenticated: true, jwt});
			}).catch(console.error);
		}
	}

	login = () => {
		this.state.dataHandler.initializeWithCredentials('admin', 'admin').then((authToken) => {
			console.log('Initialized datahandler with authToken:', authToken);
			this.setState({authenticated: true, jwt:authToken});
		});
	}

	logout = () => {
		localStorage.removeItem('authToken');
		this.setState({authenticated: false});
	}

	handleDrawerToggle = () => {
		console.log('Toggling drawer');
		this.setState({isResponsiveMenuOpen: !this.state.isResponsiveMenuOpen});
	}

	render() {

		let routes = configs.routes;

		let sidebarItems = (this.state.authenticated ? routes : routes.filter(r => r.isProtected !== true));

		let drawerProps = {
			title: 'Dojot SDK sample App',
			isResponsiveMenuOpen: this.state.isResponsiveMenuOpen,
			handleDrawerToggle: this.handleDrawerToggle,
			onSideButtonClick: (this.state.authenticated ? this.logout : this.login),
			sideButtonText: (this.state.authenticated ? 'Logout' : 'Login'),
			sidebarItems,
		};

		let appContent = routes.map(route => {
			let ModuleComponent = route.module;
			let RouteComponent = (route.isProtected ? PrivateRoute : Route);
			let pathIsExact = route.path[route.path.length - 1] === '/';

			return (
				<RouteComponent
					exact={pathIsExact}
					path={route.path}
					key={route.path}
					authenticated={this.state.authenticated}
					render={(props) => {
						return(
							<ModuleComponent
								{...props}
								authenticated={this.state.authenticated}
								dataHandler={this.state.dataHandler}
							/>
						);
					}}
				/>
					
			);

		});

		console.log('AppContent:', appContent);

		return (
			<Router>
				<ClippedDrawer
					{...drawerProps}
					content={(
						<div>
							{appContent}
						</div>
					)}
				/>
			</Router>
		);
	}

}

export default App;
