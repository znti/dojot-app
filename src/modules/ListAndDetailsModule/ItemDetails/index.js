import React from 'react';

import Form from '../../../mui/Form';

const ItemDetails = (props) => {
	let {item} = props;

	return (
		<Form
			{...props}
		/>
	);

	return (
		<Form
			formSchema={props.formSchema}
			formData={props.formData}
			handleChange={props.handleChange}
		/>
	);
}
export default ItemDetails;
