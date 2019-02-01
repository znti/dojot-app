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

function SimpleTable(props) {
	const { classes } = props;

	let {headers, data, handleRowClick, handleChangePage, handleChangeRowsPerPage} = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{headers.map(h => {
								return <TableCell	key={h.id}>{h.label}</TableCell>
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(row => (
						<TableRow key={row.id} className={classes.tableRowHover} onClick={() => handleRowClick(row.id)}>
							{headers.map(h => {
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
        count={data.length}
        rowsPerPage={5}
        page={0}
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

SimpleTable.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChangePage: PropTypes.func.isRequired,
	handleChangeRowsPerPage: PropTypes.func.isRequired,
	handleRowClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleTable);
