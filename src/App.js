import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// The plan here is to import from @dojot/gui-module-A instead
import ModuleA from './modules/ModuleA';
import ModuleB from './modules/ModuleB';
import ModuleC from './modules/ModuleC';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
		}
	}

	login = () => {
		this.setState({authenticated: true});
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
								<Link to="/moduleA">Module A</Link>
							</li>
							{this.state.authenticated && (
								<li>
									<Link to="/moduleB">Module B (protected)</Link>
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
										<h3>Currently logged {this.state.authenticated ? 'in' : 'out' }</h3>
									</div>
								);
							}}
						/>
						<Route path="/moduleA" component={ModuleA} />
						<PrivateRoute path="/moduleB" component={ModuleB} authenticated={this.state.authenticated} />
						<Route path="/moduleC" component={ModuleC} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
