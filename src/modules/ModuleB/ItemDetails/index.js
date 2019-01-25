import React from 'react';

const ItemDetails = (props) => {
	let {item} = props;
	return (
		<div>
			<h3>ItemDetails on id {item.id} starts here</h3>
			{Object.keys(item).map(k => {
				console.log('loading', k);
				return(
					<h4>{k}:{JSON.stringify(item[k])}</h4>
				);
			})}
			<h3>ItemDetails on id {item.id} ends here</h3>
		</div>
	);
}
export default ItemDetails;
