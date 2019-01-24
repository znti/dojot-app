import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// The plan here is to import from @dojot/gui-module-A instead
import ModuleA from './modules/ModuleA';
import ModuleB from './modules/ModuleB';
import ModuleC from './modules/ModuleC';

import Dojot from '@znti/dojot-web';

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
		let dojotHost = 'http://localhost/api';
		let dojotClient = new Dojot();
		dojotClient.configure(dojotHost).then((dojotClient) => {
			console.log('Dojot client is now configured');
			this.setState({
				dojotClient,
				templatesHandler: dojotClient.Templates,
				devicesHandler: dojotClient.Devices,
			});
		}).catch(console.error);
	}

	login = () => {
		this.state.dojotClient.initializeWithCredentials({username:'admin', passwd:'admin'}).then(initializedClient => {
			let jwt = initializedClient.getAuthToken();
			console.log('Authentication completed. Got token', jwt);
			this.setState({authenticated: true, jwt});
		}).catch(console.error);
	}

	logout = () => {
		this.setState({authenticated: false});
	}

	render() {
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
							<li>
								<Link to="/moduleC">Module C</Link>
							</li>
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
							render={() => {
								return(
									<ModuleA 
										templatesHandler={this.state.templatesHandler}
										devicesHandler={this.state.devicesHandler}
									/>
								);
							}}
						/>
						<PrivateRoute path="/moduleB" component={ModuleB} authenticated={this.state.authenticated} />
						<Route path="/moduleC" component={ModuleC} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
