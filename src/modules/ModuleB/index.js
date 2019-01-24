import React from 'react';
import { Route, Link } from "react-router-dom";

import SubModuleA from './SubModuleA'

const subModules = ['subModule1', 'subModule2', 'subModule3'];

const ListSample = ({ match }) => {
  return (
    <div>
			<h3>Module B starts here</h3>
      <h3>SubModules List (handled by Functional component A)</h3>
      <ul>
				{
					subModules.map(subModule => {
						return (
						<li>
							<Link to={`${match.url}/${subModule}`}> Show {subModule}</Link>
						</li>
						)
					})
				}
      </ul>

      <Route path={`${match.path}/:subModuleId`} component={SubModuleA} />
      <Route
        exact
        path={match.path}
        render={() => <h3>This is the base page (on Resource object).</h3>}
      />
			<h3>Module B ends here</h3>
    </div>
  );
}

export default ListSample;
