import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import Form from '../ui/Form';
import Table from '../ui/Table';
import BackButton from '../ui/BackButton';

import configs from './configs';

const tableHeaders = configs.schema.filter(item => {
	return item.tableType && item.tableType !== 'none';
}).map(item => {
	let { id, label, type } = item;
	let key = id;
	return {id, label, key }
});

export default class DevicesModule extends Component {

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
		console.log('Loading data');
		let {dataHandler} = this.props;
		dataHandler.dojot.Devices.get().then(devices => {
			console.log('Devices loaded', devices);
//			this.setState({items: devices});
			let items = devices.map(d => {
				d.id = '' + d.id;
				d.messages = [];
				d.messagesLength = 0;
				d.onlineStatus = 'offline';
				return d;
			});
			this.setState({items, totalRows: items.length}, () => {
				console.log('Setting table data');
				this.setTableEntries(this.state.pageNumber, this.state.rowsPerPage);
			});
		});

		dataHandler.dojot.Devices.onDeviceData(data => {
			console.log('Got new data on DevicesModule', data);
			let deviceId = data.metadata.deviceid;
			let items = [...this.state.items];
			let deviceData = items.find(i => i.id === deviceId);
			console.log('Loaded device data:', deviceData);
			if(deviceData) {
				let currentMessage = {...data.attrs, timestamp: data.metadata.timestamp};
				let messages = deviceData.messages || [];
				let messagesLength = messages.length;
				console.log('Setting message', currentMessage, 'along with', messagesLength, 'device messages');
				messages.push(currentMessage);
				messagesLength++;
				deviceData.messages = messages;
				deviceData.messagesLength = messagesLength;
				this.setState({ items });
			}
		});

		dataHandler.dojot.Devices.onDeviceChange(data => {
			console.log('Got device change on DevicesModule', data);
			let deviceId = data.metadata.deviceid;
			let deviceStatus = data.metadata.status;
			let items = [...this.state.items];
			let deviceData = items.find(i => i.id === deviceId);
			console.log('Loaded device data:', deviceData);
			if(deviceData) {
				console.log('Setting device onlineStatus as', deviceStatus);
				deviceData.onlineStatus = deviceStatus;
				this.setState({ items });
			}
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
		
		if(this.state.redirect && this.state.redirect.to !== location.pathname) {
			return <Redirect push to={this.state.redirect.to} />
		}

		console.log('Rendering DevicesModule on', this.props);
	
		return (
			<div>
				<h3>DevicesModule starts here</h3>
				<Route
					exact
					path={match.path}
					render={() => 
						<div>
							<h3>DevicesModule base page (on '/') starts here</h3>
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
							<h3>DevicesModule base page (on '/') ends here</h3>
						</div>
					}
				/>
				<Route
					path={`${match.path}/:itemId`} 
					render={(props) => {
						let {match} = props;
						let item = this.state.items.find(item => item.id === props.match.params.itemId);
						let FormHeader = () => <BackButton onClick={() => { props.history.goBack(); this.setState({redirect: null}); } }/>
						let FormFooter = () => <input type="button" value="test" onClick={() => alert('Ok')}/>
						return (
							<div>
								<h3>DevicesModule base page (on {match.url}) starts here</h3>
								<Form
									formSchema={configs.schema}
									formData={item}
									handleChange={this.handleFormChange}
									formHeader={FormHeader}
									formFooter={FormFooter}
								/>
								<h3>DevicesModule base page (on {match.url}) ends here</h3>
							</div>
						)
					}} 
				/>
				<h3>DevicesModule ends here</h3>
			</div>
		);
	}
}
