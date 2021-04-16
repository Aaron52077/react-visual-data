import React from "react";

// High order component
export default function fetcher(FieldComponent) {
  return class extends React.Component {
    render() {
      return <FieldComponent {...this.props} />;
    }
  };
}
