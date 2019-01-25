import React, { Component } from 'react';
import { Route } from "react-router-dom";

import ItemDetails from './ItemDetails';
import ItemsList from './ItemsList';

// This list is supposed to be returned from the SDK
const items = [
	{ id: 'i01', label:'item 1', extras:'this is a description for item 1' },
	{ id: 'i02', label:'item 2', extras:'this is a description for item 2' },
	{ id: 'i03', label:'item 3', extras:'this is a description for item 3' },
];

export default class ModuleC extends Component {

	render() {
		console.log('Rendering module C on', this.props);
	
		let {match} = this.props;
	
		return (
			<div>
				<h3>Module C starts here</h3>
				<Route
					exact
					path={match.path}
					render={() => 
						<div>
							<h3>Module C base page (on '/') starts here</h3>
							<ItemsList match={match} items={items}/>
							<h3>Module C base page (on '/') ends here</h3>
						</div>
					}
				/>
				<Route
					path={`${match.path}/:itemId`} 
					render={(props) => {
						let {match} = props;
						let item = items.find(item => item.id === props.match.params.itemId);
						return (
							<div>
								<h3>Module C base page (on {match.url}) starts here</h3>
								<input type="button" value="back" onClick={() => props.history.goBack()}/>
								<ItemDetails
									item={item}
								/>
								<h3>Module C base page (on {match.url}) ends here</h3>
							</div>
						)
					}} 
				/>
				<h3>Module C ends here</h3>
			</div>
		);
	}
}
