import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

import { Table, Form, BackButton } from '@znti/dojot-react-ui';

import configs from './configs';

const items = configs.data;

const headers = configs.schema.map(item => {
	let { id, label } = item;
	let key = id;
	return {id, label, key }
});

export default class ListAndDetailsModule extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			tableData: [],
			pageNumber: 0,
			rowsPerPage: 5,
			totalRows: 0,
		};
	}

	componentDidMount() {
		// let {dataHandler} = this.props;
		// dataHandler.dojot.Devices.get().then(devices => {
		// 	console.log('Devices loaded', devices);
		// 	this.setState({items: devices});
		// });
		console.log('Loading data');
		setTimeout(() => {
			console.log('Data loaded!')
			this.setState({items, totalRows: items.length}, () => {
				console.log('Setting table data');
				this.setTableEntries(this.state.pageNumber, this.state.rowsPerPage);
			});
		}, 400);
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
		let url = `${this.props.match.path}/${id}`;
		console.log('Redirecting to', url);
		this.setState({redirect:{to:url}});
	};

	render() {
		let { match, location } = this.props;
		let {redirect} = this.state;
		
		console.log('Comparing', this.props, 'and', redirect);
		
		if(this.state.redirect) {
			if(this.state.redirect.to !== location.pathname) {
				return <Redirect push to={this.state.redirect.to} />
			} else {
				this.setState({redirect:null});
			}
		}
		
		console.log('Rendering ListAndDetailsModule on', this.props);
	
		return (
			<div>
				<h3>ListAndDetailsModule starts here</h3>
				<Route
					exact
					path={match.path}
					render={() => 
						<div>
							<h3>ListAndDetailsModule base page (on '/') starts here</h3>
							<Table
								match={match}
								tableData={this.state.tableData}
								tableHeader={headers}
								pageNumber={this.state.pageNumber}
								rowsPerPage={this.state.rowsPerPage}
								totalRows={this.state.totalRows}
								handleRowClick={this.handleRowClick}
								handleChangePage={this.handleChangePage}
								handleChangeRowsPerPage={this.handleChangeRowsPerPage}
							/>
							<h3>ListAndDetailsModule base page (on '/') ends here</h3>
						</div>
					}
				/>
				<Route
					path={`${match.path}/:itemId`} 
					render={(props) => {
						let {match} = props;
						let item = this.state.items.find(item => item.id + '' === props.match.params.itemId);
						let FormHeader = () => <BackButton onClick={() => props.history.goBack()}/>
						let FormFooter = () => <input type="button" value="test" onClick={() => alert('Ok')}/>
						return (
							<div>
								<h3>ListAndDetailsModule base page (on {match.url}) starts here</h3>
								<Form
									formSchema={configs.schema}
									formData={item}
									handleChange={this.handleFormChange}
									formHeader={FormHeader}
									formFooter={FormFooter}
								/>
								<h3>ListAndDetailsModule base page (on {match.url}) ends here</h3>
							</div>
						)
					}} 
				/>
				<h3>ListAndDetailsModule ends here</h3>
			</div>
		);
	}
}
