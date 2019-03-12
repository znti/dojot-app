import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import DataHandler from './DataHandler';

import { ClippedDrawer } from '@znti/dojot-react-ui';

import configs from './configs';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			initialized: false,
			isResponsiveMenuOpen: false,
			authenticated: false,
			templatesHandler: {},
			devicesHandler: {},
			dataHandler: new DataHandler(),
		}
	}

	componentDidMount() {

		console.log('Setting callback handler for auth change');
		this.state.dataHandler.setOnLoginChangeListener((authToken) => {
			console.log('DataHandler got a login change event with data:', authToken);
			let authenticated = false;
			let jwt = null;
			if(authToken) {
				jwt = authToken;
				authenticated = true;
			}
			this.setState({authenticated, jwt});
		});

		console.log('Initializing dojot client');
		this.setState({initialized: false});

		this.state.dataHandler.initialize(configs).then(() => {
			console.log('Initialized data handler');
			let jwt = localStorage.getItem('authToken');
			if(jwt) {
				console.log('Loaded an existing auth token:', jwt);
				this.state.dataHandler.initializeWithToken(jwt).then(() => {
					console.log('Initialized datahandler with pre-existing token');
					this.setState({initialized: true});
				}).catch(console.error);
			} else {
				this.setState({initialized: true});
			}
		});

	}

	login = () => {
		this.state.dataHandler.initializeWithCredentials('admin', 'admin').then((authToken) => {
			console.log('Initialized datahandler with authToken:', authToken);
			localStorage.setItem('authToken', authToken);
		});
	}

	logout = () => {
		this.state.dataHandler.logout().then(() => {
			localStorage.removeItem('authToken');
		});
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
							
							{this.state.initialized && appContent}
							{!this.state.initialized && <h2>Loading..</h2>}

						</div>
					)}
				/>
			</Router>
		);
	}

}

export default App;
