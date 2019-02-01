import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// The plan here is to import from @dojot/gui-module-* instead
import HomeModule from './modules/HomeModule';
import ModuleA from './modules/ModuleA';
import ModuleB from './modules/ModuleB';
import ModuleC from './modules/ModuleC';

import DataHandler from './DataHandler';
import Dojot from '@znti/dojot-web';

import ClippedDrawer from './mui/ClippedDrawer';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
			templatesHandler: {},
			devicesHandler: {},
			dataHandler: new DataHandler(),
		}
	}

	componentDidMount() {
		console.log('Initializing dojot client');
		this.state.dataHandler.ping()
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
					key={route.path}
					authenticated={this.state.authenticated}
					render={(props) => {
						return(
							<ModuleComponent
								{...props}
								authenticated={this.state.authenticated}
								dataHandler={this.state.dataHandler}
//								templatesHandler={this.state.templatesHandler}
//								devicesHandler={this.state.devicesHandler}
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
