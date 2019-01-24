import React from 'react';

const SubModule = ({ match }) => {
  return (
    <div>
      <h3>SubModule A on id {match.params.subModuleId} starts here</h3>
      <h3>SubModule A on id {match.params.subModuleId} ends here</h3>
    </div>
  );
}
export default SubModule;
