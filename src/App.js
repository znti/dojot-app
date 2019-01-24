import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ModuleA from './modules/ModuleA';
import ModuleB from './modules/ModuleB';
import ModuleC from './modules/ModuleC';

class App extends Component {

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
							<li>
								<Link to="/moduleB">Module B</Link>
							</li>
							<li>
								<Link to="/moduleC">Module C</Link>
							</li>
						</ul>
					</div>
					<div className="App-body">
      			<Route
      			  exact
      			  path="/"
      			  render={() => <h3>This is the home page (on App object).</h3>}
      			/>
						<Route path="/moduleA" component={ModuleA} />
						<Route path="/moduleB" component={ModuleB} />
						<Route path="/moduleC" component={ModuleC} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
