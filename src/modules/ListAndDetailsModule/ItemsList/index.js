import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../../../mui/Table';

const SubModule = (props) => {
	let {match, items} = props;
	
	return (
		<div>
			<h3>ItemsList starts here</h3>
			<Table
				headers={props.tableHeaders}
				data={props.tableData}
				handleRowClick={props.handleRowClick}
				handleChangePage={props.handleChangePage}
				handleChangeRowsPerPage={props.handleChangeRowsPerPage}
			/>
			<h3>ItemsList ends here</h3>
		</div>
	);
}
export default SubModule;
