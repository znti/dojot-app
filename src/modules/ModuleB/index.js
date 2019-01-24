import React from 'react';
import { Route } from "react-router-dom";

import ItemsList from './ItemsList';
import ItemDetails from './ItemDetails';

// This list is supposed to be returned from the SDK
const items = [
	{ id: 'i01', label:'item 1', extras:'this is a description for item 1' },
	{ id: 'i02', label:'item 2', extras:'this is a description for item 2' },
	{ id: 'i03', label:'item 3', extras:'this is a description for item 3' },
];

const ListSample = (props) => {
	let {match} = props;

	console.log('Rendering module B');

	return (
		<div>
			<h3>Module B starts here</h3>
			<ItemsList match={match} items={items}/>

			<Route
				exact
				path={match.path}
				render={() => {
					return (
						<div>
							<h3>Module B base page (on '/') starts here</h3>
							<h3>Module B base page (on '/') ends here</h3>
						</div>
					);
				}}
			/>

			<Route 
				path={`${match.path}/:itemId`}
				render={(props) => {
					let item = items.find(item => item.id === props.match.params.itemId);
					return (
						<div>
							<h3>Module B base page (on {props.match.url}) starts here</h3>
							<ItemDetails item={item}/>
							<h3>Module B base page (on {props.match.url}) ends here</h3>
						</div>
					);
					
				}}
			/>

			<h3>Module B ends here</h3>
		</div>
	);
}

export default ListSample;
