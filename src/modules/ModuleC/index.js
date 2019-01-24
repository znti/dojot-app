import React from 'react';
import { Route, Link } from "react-router-dom";

import SubModuleA from './SubModuleA'

const subModules = ['subModule1', 'subModule2', 'subModule3'];

const ListSample = ({ match }) => {

	console.log('Rendering module C');

  return (
    <div>
			<h3>Module C starts here</h3>
      <Route
        exact
        path={match.path}
        render={() => 
					<div>
      			<ul>
						{
							subModules.map(subModule => {
			      			  return (
										<li key={subModule}>
			      			    <Link to={`${match.url}/${subModule}`}>Go to ./{subModule}</Link>
			      			  </li>
										)
							})
						}
      			</ul>
					</div>
				}
      />
      <Route 
				path={`${match.path}/:subModuleId`} 
				render={(props) => {
					let {match} = props;
					console.log(props)
					return (
						<div>
							<input type="button" value="back" onClick={() => props.history.goBack()}/>
							<SubModuleA
								subModuleId={match.params.subModuleId}
							/>
						</div>
					)
				}} 
			/>
			<h3>Module C ends here</h3>
    </div>
  );
}

export default ListSample;
