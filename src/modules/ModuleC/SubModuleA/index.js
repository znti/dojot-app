import React from 'react';

const SubModule = (props) => {
  return (
    <div>
      <h3>Submodule A on id {props.subModuleId} starts here</h3>
      <h3>Submodule A on id {props.subModuleId} ends here</h3>
    </div>
  );
}
export default SubModule;
