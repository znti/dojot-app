import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Table from '../ui/Table';
import Form from '../ui/Form';

import Button from '../ui/Button';

export default class LoginModule extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formData: {},
		}
	}

	formSubmit = () => { 
		let { user, pwd } = this.state.formData;
		console.log(`Submitting login form with user ${user} and password ${pwd}`);
	}

	render() {
		console.log('Rendering LoginModule', this.props);

		let formSchema = [{
			type: 'text',
			id: "user",
			label: "E-mail",
			size: 'L'
		},{
			type: 'text',
			id: "pwd",
			label: "Senha" ,
			size: 'L'
		}];

		let formHeader = (props) => <h3>Login</h3>
		let formFooter = (props) => 
			<Button 
				variant="contained"
				color="primary"
				value="Login"
				onClick={this.formSubmit}
			/>

		let formProps = {
			formSchema,
			formHeader,
			formFooter,
			formData: this.state.formData,
			handleChange: (type, id) => event => { 
				let {value} = event.target;
				console.log(`(${type}) ${id} = ${value}`);
				let {formData} = this.state;
				formData[id] = value;
				this.setState({formData});
			}
		}

		if(this.props.authenticated) {
			return <Redirect to="/"/> 
		}

		return (
			<div>
				<h3>This is the home page (on App object)</h3>
				<h3>Currently logged {this.props.authenticated ? 'in' : 'out' }</h3>
				<div>

					<Form
						{...formProps}
					/>

				</div>
			</div>
		);
	}
}
