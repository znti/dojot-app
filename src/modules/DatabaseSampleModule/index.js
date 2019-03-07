import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Table from '../ui/Table';
import Form from '../ui/Form';

import Button from '../ui/Button';

export default class DatabaseSampleModule extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formData: {},
		}
	}

	formSubmit = () => { 
		let { user, pwd } = this.state.formData;
		console.log(`Submitting login form with user ${user} and password ${pwd}`);
		this.props.dataHandler.initializeWithCredentials(user, pwd).then(() => {
			console.log('Successfully logged in');
		}).catch(console.error);
	}

	render() {
		console.log('Rendering DatabaseSampleModule', this.props);

		let { database } = this.props.dataHandler;

		let forms = [

			{
				header: (props) =>
					<h3>POST</h3>,
				footer: (props) => 
					<Button 
						variant="contained"
						color="primary"
						value="POST"
						onClick={() => database.post(this.state.formData.postData).then(console.log)}
					/>,
				schema: [{
					type: 'text',
					id: 'postData',
					label: 'Data to post',
					size: 'M',
				}],
			},

			{
				header: (props) => 
					<h3>GET</h3>,
				footer: (props) => 
					<Button 
						variant="contained"
						color="primary"
						value="GET"
						onClick={() => database.get(this.state.formData.getId).then((data) => this.setState({valueRetrieved: JSON.stringify(data)} ) ) }
					/>,
				schema: [{
					type: 'text',
					id: 'getId',
					label: 'Id to get',
					size: 'M',
				}],
			},

		];

		let formProps = {
			formData: this.state.formData,
			handleChange: (type, id) => event => { 
				let {value} = event.target;
				console.log(`(${type}) ${id} = ${value}`);
				let {formData} = this.state;
				formData[id] = value;
				this.setState({formData});
			}
		}

		return (
			<div>
				<div>
					{forms.map(form => {
	 					return (
							<Form
		 						formSchema={form.schema}
		 						formHeader={form.header}
		 						formFooter={form.footer}
		 						{...formProps}
		 					/>
						);
					})}

					<Form
						disabled
						formHeader={(props) => <h3>Data</h3>}
						formSchema={[{
							type: 'text',
							id: 'valueRetrieved',
							label: 'DB value',
							size: 'L',
						}]}
						handleChange={(a) => {console.log(a)}}
						formData={{valueRetrieved: this.state.valueRetrieved}}
					/>

				</div>
			</div>
		);
	}
}
