import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";


//import { Table, Form, Button, BackButton } from '../ui';
import { Table, Form, Button, BackButton, FileSelector } from '@znti/dojot-react-ui';

export default class FilesModule extends Component {

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


	render() {
		console.log('Rendering FilesModule', this.props);
		let { match, location } = this.props;

		let {redirect} = this.state;
		
		console.log('Comparing', this.props, 'and', redirect);
		
		if(this.state.redirect && this.state.redirect.to !== location.pathname) {
			return <Redirect push to={this.state.redirect.to} />
		}

	

		return (
			<div>
				<h3>FilesModule starts here</h3>
					
				<FileSelector
					buttonLabel={this.state.uploading? 'Uploading..' : 'Upload files'}
					onFilesSelected={(files) => {
						console.log('oh my now I have files:', files)
						this.props.dataHandler.storage.post(files[0]).then((uploadData) => {
							console.log('Uploaded file on:', uploadData);
						});
					}}
				/>


				<br/>
				<h2>Get file by ID</h2>
				<input type="text" onChange={(e) => this.setState({fileIdToGet: e.target.value})}/>

				<Button 
					variant="contained"
					color="primary"
					value="Get" 
					onClick={() => {
						let fileId = this.state.fileIdToGet;
						fileId && this.props.dataHandler.storage.get(this.state.fileIdToGet).then(fileData => {
							console.log('Retrieved file data:', fileData);
						});
					}}
				/>

			</div>
		);
	}
}
