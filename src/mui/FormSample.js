import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';



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

let handleTextChange = id => event => {
	let { value } = event.target;
	console.log('Setting', id, 'as', value);
	
};

let handleCheckboxChange = id => event => {
	let { checked } = event.target;
	console.log('Setting', id, 'check as', checked);
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
					let sm = 6;
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
					}
					
					switch (item.type) {
						case 'checkbox':
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<FormControlLabel
										control={
											<Checkbox 
												color="secondary"
												onChange={handleCheckboxChange(item.id)}
											/>
										}
										label={item.label}
									/>
								</Grid>
							);
						
						default:
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<TextField
										fullWidth
										{...item}
										onChange={handleTextChange(item.id)}
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