import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// The plan here is to import from @dojot/gui-module-A instead
import HomeModule from './modules/HomeModule';
import ModuleA from './modules/ModuleA';
import ModuleB from './modules/ModuleB';
import ModuleC from './modules/ModuleC';

import Dojot from '@znti/dojot-web';

import ClippedDrawer from './ClippedDrawer';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
			templatesHandler: {},
			devicesHandler: {},
		}
	}

	componentDidMount() {
		console.log('Initializing dojot client');
		//let dojotHost = 'http://localhost/api';
		let dojotHost = 'http://10.202.21.65/api';
		let dojotClient = new Dojot();
		dojotClient.configure(dojotHost).then((dojotClient) => {
			console.log('Dojot client is now configured');
			this.setState({
				dojotClient,
				templatesHandler: dojotClient.Templates,
				devicesHandler: dojotClient.Devices,
			});

			let jwt = localStorage.getItem('authToken');
			if(jwt) {
				console.log('Loaded previous token', jwt);
				dojotClient.initializeWithAuthToken(jwt).then(() => {
					console.log('Initialized the client with the previously saved token');
					this.setState({authenticated: true, jwt});
				});
			}

		}).catch(console.error);
	}

	login = () => {
		this.state.dojotClient.initializeWithCredentials({username:'admin', passwd:'admin'}).then(initializedClient => {
			let jwt = initializedClient.getAuthToken();
			console.log('Authentication completed. Got token', jwt);
			localStorage.setItem('authToken', jwt);
			this.setState({authenticated: true, jwt});
		}).catch(console.error);
	}

	logout = () => {
		localStorage.removeItem('authToken');
		this.setState({authenticated: false});
	}

	render() {

		// This will likely be in a separate routes.js file
		let routes = [
			{label:'Home', path:'/', module: HomeModule},
			{label:'Module A', path:'/moduleA', module: ModuleA, isProtected: true},
			{label:'Module B', path:'/moduleB', module: ModuleB, isProtected: true},
			{label:'Module C', path:'/moduleC', module: ModuleC, isProtected: true},
		];

		let sidebarItems = (this.state.authenticated ? routes : routes.filter(r => r.isProtected !== true));

		let drawerProps = {
			title: 'Dojot sdk sample App',
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
					authenticated={this.state.authenticated}
					render={(props) => {
						return(
							<ModuleComponent
								{...props}
								authenticated={this.state.authenticated}
								templatesHandler={this.state.templatesHandler}
								devicesHandler={this.state.devicesHandler}
							/>
						);
					}}
				/>
					
			);

		});

		return (
			<Router>
				<div className="App">
					<ClippedDrawer
						{...drawerProps}
						content={(
								<div className="App-body">
									{appContent}
								</div>
							)}
					/>
				</div>
			</Router>
		);
	}

}

export default App;
