import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	gridHeader: {
		paddingTop: theme.spacing.unit * 3,
	},
	mainGrid: {
		padding: theme.spacing.unit * 3,
	},
	formControl: {
		width: '100%',
	}
});

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

let handleChange = (type, id) => event => {
	let value;
	if(type === 'checkbox') {
		value = event.target.checked;
	} else {
		value = event.target.value;
	}
	console.log(`(${type}) ${id} = ${value}`);
};

function FormSample(props) {
	let { classes } = props;
	return (
		<Paper className={classes.root}>
		
			<Typography className={classes.gridHeader} variant="h6" gutterBottom>
				Sample details page
			</Typography>
			
			<Grid className={classes.mainGrid} container spacing={24}>
				{formItems.map(item => {
					let xs = 12;
					let sm;
					switch(item.size.toUpperCase()) {
						case 'S': // Small
							sm = 4;
							break;
						case 'M': // Medium
							sm = 6;
							break;
						case 'L': // Large
							sm = 12;
							break;
						default:
							sm = 6;
					}
					
					switch (item.type) {
						case 'checkbox':
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<FormControlLabel
										control={
											<Checkbox 
												color="secondary"
												onChange={handleChange('checkbox', item.id)}
											/>
										}
										label={item.label}
									/>
								</Grid>
							);
							
						case 'date':
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<TextField
									fullWidth
										id={item.id}
										label={item.label}
										type="date"
										defaultValue="2017-05-24"
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
										onChange={handleChange('date', item.id)}
									/>
								</Grid>
							);
						
						case 'time':
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<TextField
										fullWidth
										id={item.id}
										label={item.label}
										type="time"
										defaultValue="07:30"
										// className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 300, // 5 min
										}}
										onChange={handleChange('time', item.id)}
									/>
								</Grid>
							);
						
						case 'select':
						return (
							<Grid item xs={xs} sm={sm} key={item.id}>
								<FormControl className={classes.formControl}>
									<InputLabel>{item.label}</InputLabel>
									<Select
										value={item.selectedOption}
										onChange={handleChange('select', item.id)}
										inputProps={{
											// name: 'age',
											// id: 'age-simple',
										}}
									>
										{item.options.map(option => {
											return(
												<MenuItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>
				);
						
						default:
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<TextField
										fullWidth
										id={item.id}
										label={item.label}
										onChange={handleChange('text', item.id)}
									/>
								</Grid>
							);
					}
				
				})}
			</Grid>
		</Paper>
	);
}

export default withStyles(styles)(FormSample);