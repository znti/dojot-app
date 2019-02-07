import React from 'react';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function BackButton(props) {
	let { classes } = props;
	console.log(props);
	return(
		<Button className={classes.button}
			{...props}
		>
			{props.value}
		</Button>
	);
}

export default withStyles(styles)(BackButton);
