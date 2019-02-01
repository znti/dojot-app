import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function SimpleTable(props) {
	const { classes } = props;

	let {headers} = props;

	headers = [
		{label:'Dessert (100g serving)', key:'name'},
		{label:'Calories', key:'calories'},
		{label:'Fats (g)', key:'fat'},
		{label:'Carbs (g)', key:'carbs'},
		{label:'Protein (g)', key:'protein'},
	]

	let onRowClick = (rowId) => console.log('Clicked on row', rowId);

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{headers.map(h => {
								return <TableCell>{h.label}</TableCell>
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.id} className={classes.tableRowHover} onClick={() => onRowClick(row.id)}>
							{headers.map(h => {
								let val = row[h.key];
								let alignment = (typeof(val) === 'number' ? 'right' : 'left')
									return <TableCell align={alignment}>{val}</TableCell>
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

SimpleTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
