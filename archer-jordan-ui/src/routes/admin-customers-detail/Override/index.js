import React from "react";
// COMPONENTS
import EmployeeOverride from "./EmployeeOverride";
import CustomerOverride from "./CustomerOverride";

class Override extends React.PureComponent {
  render() {
    console.log(this.props);
    return (
      <div style={{ width: 700, maxWidth: "100%" }}>
        <CustomerOverride {...this.props} />
        <EmployeeOverride {...this.props} />
      </div>
    );
  }
}

export default Override;
