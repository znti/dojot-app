import React, { Component } from 'react';
import SimpleTable from '../../mui/SimpleTable';

export default class HomeModule extends Component {

	render() {
		console.log('Rendering HomeModule', this.props);
		return (
			<div>
				<h3>This is the home page (on App object)</h3>
				<h3>Currently logged {this.props.authenticated ? 'in' : 'out' }</h3>
				<div>
				<SimpleTable/>
				</div>
			</div>
		);
	}
}
