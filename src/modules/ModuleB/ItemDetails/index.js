import React from 'react';

const SubModule = (props) => {
	let {id} = props.item;
	return (
		<div>
			<h3>SubModule A on id {id} starts here</h3>
			<h3>SubModule A on id {id} ends here</h3>
		</div>
	);
}
export default SubModule;
