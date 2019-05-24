import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
export default ComposedComponent => {
  class NotAuthentication extends Component {
    PropTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push("/");
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { isAuthenticated: state.authentication.isAuthenticated };
  }
  return connect(mapStateToProps)(NotAuthentication);
};
