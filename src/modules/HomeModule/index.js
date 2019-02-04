import React, { Component } from 'react';
import SimpleTable from '../../mui/SimpleTable';
import FormSample from '../../mui/FormSample';

export default class HomeModule extends Component {

	render() {
		console.log('Rendering HomeModule', this.props);


		let id = 0;
		function createData(name, calories, fat, carbs, protein) {
			id += 1;
			return { id, name, calories, fat, carbs, protein };
		}
		
		function handleChangePage(event, newPage) {
		  console.log('handling change page to', newPage);
		}
		
		function handleChangeRowsPerPage(event) {
			let rowsPerPage = event.target.value;
			console.log('handling change rows per page to', rowsPerPage);
		}

		let headers = [
			{id:0, label:'Dessert (100g serving)', key:'name'},
			{id:1, label:'Calories', key:'calories'},
			{id:2, label:'Fats (g)', key:'fat'},
			{id:3, label:'Carbs (g)', key:'carbs'},
			{id:4, label:'Protein (g)', key:'protein'},
		]
	
		let data = [
			createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
			createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
			createData('Eclair', 262, 16.0, 24, 6.0),
			createData('Cupcake', 305, 3.7, 67, 4.3),
			createData('Gingerbread', 356, 16.0, 49, 3.9),
		];
	
		let handleRowClick = (rowId) => console.log('Clicked on row', rowId);

		let tableProps = {
			headers,
			data,
			handleRowClick,
			handleChangePage,
			handleChangeRowsPerPage,
		}

		let formProps = {
			headers,
			data: data[0],
		}

		return (
			<div>
				<h3>This is the home page (on App object)</h3>
				<h3>Currently logged {this.props.authenticated ? 'in' : 'out' }</h3>
				<div>

					<SimpleTable
						{...tableProps}					
					/>

					<FormSample
						{...formProps}
					/>

				</div>
			</div>
		);
	}
}
