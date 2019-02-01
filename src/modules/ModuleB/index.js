import React, { Component } from 'react';
import { Route } from "react-router-dom";

import ItemsList from './ItemsList';
import ItemDetails from './ItemDetails';

export default class ModuleB extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
		}
	}

	componentDidMount() {
		let {dataHandler} = this.props;
		dataHandler.dojot.Templates.get().then(templates => {
			console.log('Templates loaded', templates);
			this.setState({items: templates});
		});
	}

	render() {
		console.log('Rendering module B on', this.props);
	
		let {match} = this.props;
	
		return (
			<div>
				<h3>Module B starts here</h3>
				<ItemsList match={match} items={this.state.items}/>
	
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
						let item = this.state.items.find(item => item.id + '' === props.match.params.itemId);
						console.log('Loading details from', item);
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
}
