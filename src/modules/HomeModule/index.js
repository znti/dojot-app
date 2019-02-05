import React, { Component } from 'react';
import Table from '../ui/Table';
import Form from '../ui/Form';


const formItems = [
	{
		// required: true,
		// autoComplete: "fname",
		type: 'text',
		id: "firstName",
		label: "First name",
		size: 'M'
	},{
		type: 'text',
		id: "lastName",
		label: "Last name",
		size: 'M'
	},{
		type: 'text',
		id: "mail",
		label: "E-mail address" ,
		size: 'M'
	},{
		type: 'checkbox',
		id: 'spamMe',
		label: 'Send me spam',
		size: 'M',
	},{
		type: 'select',
		id: 'dateTimeSelect',
		label: 'Whats your timezone',
		size: 'S',
		options: [
			{value: 0, label: 'zero'},
			{value: 1, label: 'one'},
			{value: 2, label: 'two'},
		],
		selectedOption: 0,
	},{
		type: 'date',
		id: 'appointmentDate',
		label: 'Tell us the date',
		size: 'S',
	},{
		type: 'time',
		id: 'appointmentTime',
		label: 'Tell us the time',
		size: 'S',
	},{
		type: 'text',
		id: "address1",
		label: "Address line 1",
		size: 'L'
	},{
		type: 'text',
		id: "address2",
		label: "Address line 2",
		size: 'L'
	},{
		type: 'radio',
		id: 'radioSelect',
		label: 'Select a number',
		size: 'M',
		options: [
			{value: 4, label: 'four'},
			{value: 5, label: 'five'},
			{value: 6, label: 'six'},
		],
		selectedOption: 5,
	},{
		type: 'text',
		id: "city",
		label: "City",
		size: 'L'
	},{
		type: 'text',
		id: "zip",
		label: "Zip / Postal code",
		size: 'S'
	},{
		type: 'text',
		id: "country",
		label: "Country",
		size: 'S'
	},{
		type: 'text',
		id: "state",
		label: "State/Province/Region" ,
		size: 'S'
	},
];

export default class HomeModule extends Component {

	render() {
		console.log('Rendering HomeModule', this.props);


		let id = 0;
		function createData(name, calories, fat, carbs, protein) {
			id += 1;
			return { id, name, calories, fat, carbs, protein };
		}
		
		let handleRowClick = (rowId) => console.log('Clicked on row', rowId);

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
		];
	
		let data = [
			createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
			createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
			createData('Eclair', 262, 16.0, 24, 6.0),
			createData('Cupcake', 305, 3.7, 67, 4.3),
			createData('Gingerbread', 356, 16.0, 49, 3.9),
			createData('Oreo', 212, 112.0, 142, 13.9),
			createData('Marshmallow', 156, 14.2, 24, 1.3),
		];
	
		let tableProps = {
			tableHeader: headers,
			tableData: data,
			handleRowClick,
			handleChangePage,
			handleChangeRowsPerPage,
			pageNumber: 0,
			rowsPerPage: 5,
			totalRows: data.length,
		}

		let formProps = {
			headers,
			formSchema: formItems,
			formData: data[0],
			handleChange: (type, id) => event => { 
				console.log(`(${type}) ${id} = ${event.target.value}`)
			}
		}

		return (
			<div>
				<h3>This is the home page (on App object)</h3>
				<h3>Currently logged {this.props.authenticated ? 'in' : 'out' }</h3>
				<div>

					<Table
						{...tableProps}					
					/>

					<Form
						{...formProps}
					/>

				</div>
			</div>
		);
	}
}
