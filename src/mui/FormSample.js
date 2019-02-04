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

const formItems = [{
		required: true,
		id: "firstName",
		name: "firstName",
		label: "First name",
		autoComplete: "fname",
		size: 'M'
	},{
		required: true,
		id: "lastName",
		name: "lastName",
		label: "Last name",
		autoComplete: "lname",
		size: 'M'
	},{
		required: true,
		id: "address1",
		name: "address1",
		label: "Address line 1",
		fullWidth: true,
		autoComplete: "billing address-line1",
		size: 'L'
	},{
		id: "address2",
		name: "address2",
		label: "Address line 2",
		fullWidth: true,
		autoComplete: "billing address-line2",
		size: 'L'
	}, {
		required: true,
		id: "city",
		name: "city",
		label: "City",
		autoComplete: "billing address-level2",
		size: 'L'
	}, {
		required: true,
		id: "zip",
		name: "zip",
		label: "Zip / Postal code",
		autoComplete: "billing postal-code",
		size: 'S'
	}, {
		required: true,
		id: "country",
		name: "country",
		label: "Country",
		autoComplete: "billing country",
		size: 'S'
	},{
		id: "state",
		name: "state",
		label: "State/Province/Region" ,
		size: 'S'
}];

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
				
					return (
						<Grid item xs={xs} sm={sm}>
							<TextField
								fullWidth
								{...item}
							/>
						</Grid>
					);
				})}
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
						label="Use this address for payment details"
					/>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default withStyles(styles)(FormSample);