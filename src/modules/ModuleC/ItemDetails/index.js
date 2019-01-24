import React from 'react';

const SubModule = (props) => {
	let {item} = props;
	return (
		<div>
			<h3>Submodule A on id {item.id} starts here</h3>
			<h4>{item.extras}</h4>
			<h3>Submodule A on id {item.id} ends here</h3>
		</div>
	);
}
export default SubModule;
