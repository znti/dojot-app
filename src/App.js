import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// The plan here is to import from @dojot/gui-module-A instead
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
			{label:'Home', url:'/'},
			{label:'Module A', url:'/moduleA', protected: true},
			{label:'Module B', url:'/moduleB', protected: true},
			{label:'Module C', url:'/moduleC', protected: true},
		];

		let sidebarItems = (this.state.authenticated ? routes : routes.filter(r => r.protected !== true))

		let drawerProps = {
			title: 'Dojot sdk sample App',
			onSideButtonClick: (this.state.authenticated ? this.logout : this.login),
			sideButtonText: (this.state.authenticated ? 'Logout' : 'Login'),
			sidebarItems,
		}

		return (

			<Router>
				<div className="App">


		<ClippedDrawer

			{...drawerProps}

			content={

					<div className="App-body">

						<Route
							exact
							path="/"
							render={() => {
								return(
									<div>
										<h3>This is the home page (on App object)</h3>
										<h3>Currently logged {this.state.authenticated ? `in with token ${this.state.jwt.slice(0,20)}(...)}` : 'out' }</h3>
									</div>
								);
							}}
						/>

						<PrivateRoute
							path="/moduleA" 
							authenticated={this.state.authenticated}
							render={(props) => {
								return(
									<ModuleA 
										{...props}
										templatesHandler={this.state.templatesHandler}
										devicesHandler={this.state.devicesHandler}
									/>
								);
							}}
						/>

						<PrivateRoute
							path="/moduleB"
							authenticated={this.state.authenticated}
							render={(props) => {
								return(
									<ModuleB
										{...props}
										templatesHandler={this.state.templatesHandler}
										devicesHandler={this.state.devicesHandler}
									/>
								);
							}}
						/>

						<PrivateRoute
							path="/moduleC"
							authenticated={this.state.authenticated}
							render={(props) => {
								return(
									<ModuleC
										{...props}
										templatesHandler={this.state.templatesHandler}
										devicesHandler={this.state.devicesHandler}
									/>
								);
							}}
						/>






					</div>

			}

		/>

				</div>
			</Router>
		);
	}

	oldrender() {
		return (
			<Router>
				<div className="App">
					<div className="App-header">
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/moduleA">Module A (protected but shown)</Link>
							</li>
							{this.state.authenticated && (
								<li>
									<Link to="/moduleB">Module B (protected and hidden)</Link>
								</li>
								)
							}
							{this.state.authenticated && (
								<li>
									<Link to="/moduleC">Module C (protected and hidden)</Link>
								</li>
								)
							}
							{this.state.authenticated ?
								<li>
									<input type="button" value="Logout" onClick={this.logout}/>
								</li>
							:
								<li>
									<input type="button" value="Login" onClick={this.login}/>
								</li>
							}
						</ul>
					</div>
					<div className="App-body">

						<Route
							exact
							path="/"
							render={() => {
								return(
									<div>
										<h3>This is the home page (on App object)</h3>
										<h3>Currently logged {this.state.authenticated ? `in with token ${this.state.jwt}` : 'out' }</h3>
									</div>
								);
							}}
						/>

						<PrivateRoute
							path="/moduleA" 
							authenticated={this.state.authenticated}
							render={(props) => {
								return(
									<ModuleA 
										{...props}
										templatesHandler={this.state.templatesHandler}
										devicesHandler={this.state.devicesHandler}
									/>
								);
							}}
						/>

						<PrivateRoute
							path="/moduleB"
							authenticated={this.state.authenticated}
							render={(props) => {
								return(
									<ModuleB
										{...props}
										templatesHandler={this.state.templatesHandler}
										devicesHandler={this.state.devicesHandler}
									/>
								);
							}}
						/>

						<PrivateRoute
							path="/moduleC"
							authenticated={this.state.authenticated}
							render={(props) => {
								return(
									<ModuleC
										{...props}
										templatesHandler={this.state.templatesHandler}
										devicesHandler={this.state.devicesHandler}
									/>
								);
							}}
						/>

					</div>
				</div>
			</Router>
		);
	}
}

export default App;
