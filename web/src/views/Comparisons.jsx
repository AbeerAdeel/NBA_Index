import React from "react";
import Search from "components/Search";

class Comparisons extends React.Component {
  render() {
    return (
      <div className="content">
        <Search isMultiple={true} />
      </div>
    );
  }
}

export default Comparisons;
