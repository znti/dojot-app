import React from 'react';
import { Link } from 'react-router-dom';

const SubModule = (props) => {
	let {match, items} = props;
	return (
		<div>
			<h3>ItemsList starts here</h3>
			<ul>
		{
			items.map(item => {
				return (
					<li key={item.id}>
						<Link to={`${match.url}/${item.id}`}>Show {item.label} details</Link>
					</li>
				)
			})
		}
			</ul>
			<h3>ItemsList ends here</h3>
		</div>
	);
}
export default SubModule;
