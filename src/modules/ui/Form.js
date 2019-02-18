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
import FormLabel from '@material-ui/core/FormLabel';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	// gridHeader: {
	// 	paddingTop: theme.spacing.unit * 3,
	// },
	mainGrid: {
		padding: theme.spacing.unit * 3,
	},
	formControl: {
		width: '100%',
	},
	formLabel: {
		display: 'flex',
	}
});

function Form(props) {
	let { classes, formSchema, handleChange } = props;
	let FormHeaderComponent = props.formHeader;
	let FormFooterComponent = props.formFooter;
	let formData = props.formData || {};
	console.log('Form data is', formData);
	return (
		<Paper className={classes.root}>
			{FormHeaderComponent && <FormHeaderComponent/>}
			<Grid className={classes.mainGrid} container spacing={24}>
				{formSchema.map(item => {
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
					
					console.log(item.id, formData[item.id]);
					
					// TODO turn each of those into components instead of rendering here
					switch (item.formType) {

						case 'none':
							return;

						case 'text[]':
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<FormControl className={classes.formControl}>
										<FormLabel className={classes.formLabel}>{item.label}</FormLabel>
										<List>
											{formData[item.id].map(text => {
												console.log('');
												return (
													<ListItem>
														<ListItemText primary={JSON.stringify(text)} />
													</ListItem>
												);
											})}
										</List>
									</FormControl>
								</Grid>
							);

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
										value={formData[item.id]}
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
										defaultValue="12:00"
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
										<InputLabel
										>
											{item.label}
										</InputLabel>
										<Select
											value={formData[item.id]}
											onChange={handleChange('select', item.id)}
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
						
						case 'radio':
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<FormControl className={classes.formControl}>
										<FormLabel className={classes.formLabel}>{item.label}</FormLabel>
										<RadioGroup
											row
											className={classes.group}
											value={formData[item.id]}
											onChange={handleChange('radio', item.id)}
										>
											{item.options.map(option => {
											console.log('comparing radios (o/fD):', option.value, formData[item.id])
												return (
													<FormControlLabel
														
														key={option.value}
														value={option.value}
														control={<Radio 
														checked={option.value + "" === formData[item.id]}
														/>}
														label={option.label}
													/>
												);
											})}
										</RadioGroup>
									</FormControl>
								</Grid>
							);

						default:
							return (
								<Grid item xs={xs} sm={sm} key={item.id}>
									<TextField
										fullWidth
										value={formData[item.id]}
										id={item.id}
										label={item.label}
										InputLabelProps={{ shrink: true }}
										onChange={handleChange('text', item.id)}
									/>
								</Grid>
							);
					}
				
				})}
			</Grid>
			{FormFooterComponent && <FormFooterComponent/>}
		</Paper>
	);
}

export default withStyles(styles)(Form);
