import React, { Component } from 'react';

export default class ModuleA extends Component {
	constructor(props) {
		super(props);
		this.state = {
			templates: [],
			devices: [],
		}
	}

	componentDidMount() {
		this.props.templatesHandler.get().then(templates => {
			console.log('Templates loaded', templates);
			this.setState({templates});
		});

		this.props.devicesHandler.get().then(devices => {
			console.log('Devices loaded', devices);
			this.setState({devices});
		});
	}

	render() {
		console.log('Rendering ModuleA');
		return (
			<div>
				<h3>Module A starts here</h3>
				<h4>{this.state.templates.length} templates and {this.state.devices.length} devices</h4>
				<h3>Module A ends here</h3>
			</div>
		);
	}
}
