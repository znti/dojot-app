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
	let { classes } = props;
	return(
		<Button className={classes.button}
			{...props}
		>
			<ArrowBack/>
		</Button>
	);
}

export default withStyles(styles)(BackButton);
