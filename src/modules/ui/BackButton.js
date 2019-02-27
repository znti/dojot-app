import React from 'react';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function BackButton(props) {
	let { classes, ...otherProps } = props;
	console.log('Rendering back button with props', otherProps);
	return(
		<Button className={classes.button}
			{...otherProps}
		>
			<ArrowBack/>
		</Button>
	);
}

export default withStyles(styles)(BackButton);
