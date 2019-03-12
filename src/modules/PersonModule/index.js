import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";


//import { Table, Form, Button, BackButton } from '../ui';
import { Table, Form, Button, BackButton } from '@znti/dojot-react-ui';

import configs from './configs';

const tableHeaders = configs.schema.filter(item => {
	return item.tableType && item.tableType !== 'none';
}).map(item => {
	let { id, label, type } = item;
	let key = id;
	return {id, label, key }
});

export default class DatabaseSampleModule extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formData: {},
			items: [],
			tableData: [],
			pageNumber: 0,
			rowsPerPage: 5,
			totalRows: 0,
		}
	}

	componentDidMount() {
		this.props.dataHandler.database.listen(data => {
			console.log('Adding data', data, 'to items');
			let items = [...this.state.items, data];
			let totalRows = items.length;
			this.setState({items, totalRows}, () => {
				this.setTableEntries(this.state.pageNumber, this.state.rowsPerPage);
			});
		});
	}

	setTableEntries = (pageNumber, rowsPerPage) => {
		console.log(`Setting table data for page #${pageNumber} and ${rowsPerPage} items per page`);
		let firstIndex = pageNumber * rowsPerPage;
		let lastIndex = firstIndex + rowsPerPage;
		let tableData = this.state.items.slice(firstIndex, lastIndex);
		console.log('Setting table data as', tableData);
		this.setState({tableData, pageNumber, rowsPerPage});
	}
	
	handleFormChange = (type, id) => event => {
		let value;
		if(type === 'checkbox') {
			value = event.target.checked;
		} else {
			value = event.target.value;
		}
		console.log(`(${type}) ${id} = ${value}`);
		let { formData } = this.state;
		formData[id] = value;
		this.setState({formData});
	};

	handleChangePage = (event, pageNumber) => {
		// let pageNumber = event.target.value;
		// console.log(event.target);
		console.log('Changing to page number', pageNumber);
		this.setTableEntries(pageNumber, this.state.rowsPerPage);
	}
	
	handleChangeRowsPerPage = event => {
		let rowsPerPage = event.target.value;
		console.log('Changing total per page to', rowsPerPage);
		this.setTableEntries(this.state.pageNumber, rowsPerPage);
	}

	handleRowClick = id => {
		console.log('Clicked on item', id);
		this.redirectToItem(id);
	};

	redirectToItem = id => {
		let url = `${this.props.match.path}/${id}`;
		console.log('Redirecting to', url);
		this.setState({redirect:{to:url}});
	}

	formSubmit = () => { 
		console.log('Submitting form with data', this.state.formData);
		this.props.dataHandler.database.post(this.state.formData).then((item) => {
			console.log('Added item', item);
			this.props.history.goBack();
			this.setState({redirect: null});
		});
	}

	render() {
		console.log('Rendering DatabaseSampleModule', this.props);
		let { match, location } = this.props;

		let { database } = this.props.dataHandler;

		let {redirect} = this.state;
		
		console.log('Comparing', this.props, 'and', redirect);
		
		if(this.state.redirect && this.state.redirect.to !== location.pathname) {
			return <Redirect push to={this.state.redirect.to} />
		}

	
		return (
			<div>
				<h3>PersonModule starts here</h3>
				<Route
					exact
					path={match.path}
					render={() => 
						<div>
							<h3>PersonModule base page (on '/') starts here</h3>
							<Button 
								variant="contained"
								color="primary"
								value="New item"
								onClick={() => this.redirectToItem('new')}
							/>
							<Table
								match={match}
								tableData={this.state.tableData}
								tableHeader={tableHeaders}
								pageNumber={this.state.pageNumber}
								rowsPerPage={this.state.rowsPerPage}
								totalRows={this.state.totalRows}
								handleRowClick={this.handleRowClick}
								handleChangePage={this.handleChangePage}
								handleChangeRowsPerPage={this.handleChangeRowsPerPage}
							/>
							<h3>PersonModule base page (on '/') ends here</h3>
						</div>
					}
				/>
				<Route
					path={`${match.path}/:itemId`} 
					render={(props) => {
						let {match} = props;
						let itemId = props.match.params.itemId;

						console.log('Rendering on itemId', itemId);

						let newItem = false;

						let item = {};

						if(itemId === 'new') {
							console.log('Rendering new item page');
							newItem = true;
						} else {
							item = this.state.items.find(item => item.id === props.match.params.itemId);
							console.log('Rendering details page for item:', item);
						}


						let FormHeader = () => 
							<BackButton 
								onClick={() => { 
									props.history.goBack(); 
									this.setState({redirect: null});
								}}
							/>
						let FormFooter = (props) => 
							<Button 
								variant="contained"
								color="primary"
								value="Save" 
								onClick={() => this.formSubmit()}
							/>
						return (
							<div>
								<h3>PersonModule base page (on {match.url}) starts here</h3>
								<Form
									formSchema={configs.schema}
									formData={item}
									handleChange={this.handleFormChange}
									formHeader={FormHeader}
									formFooter={FormFooter}
								/>
								<h3>PersonModule base page (on {match.url}) ends here</h3>
							</div>
						)
					}} 
				/>
			</div>
		);
	}
}
