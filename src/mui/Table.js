import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
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

function mTable(props) {
	const { classes } = props;

	let { tableHeader, tableData, 
				handleRowClick, handleChangePage, 
				handleChangeRowsPerPage,
				rowsPerPage, pageNumber, totalRows
	} = props;

	console.log('Table being rendered on', props);

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{tableHeader.map(h => {
								return <TableCell	key={h.id}>{h.label}</TableCell>
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map(row => (
						<TableRow key={row.id} className={classes.tableRowHover} onClick={() => handleRowClick(row.id)}>
							{tableHeader.map(h => {
								let val = row[h.key];
								let alignment = (typeof(val) === 'number' ? 'right' : 'left')
									return <TableCell key={h.id} align={alignment}>{val}</TableCell>
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>

			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={totalRows}
				rowsPerPage={rowsPerPage}
				page={pageNumber}
				backIconButtonProps={{
					'aria-label': 'Previous Page',
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

Table.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChangePage: PropTypes.func.isRequired,
	handleChangeRowsPerPage: PropTypes.func.isRequired,
	handleRowClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(mTable);