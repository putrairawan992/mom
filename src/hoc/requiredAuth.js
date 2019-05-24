import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
export default ComposedComponent => {
  class Authentication extends Component {
    PropTypes = {
      router: PropTypes.object
    };
    
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { isAuthenticated: state.authentication.isAuthenticated };
  }
  return connect(mapStateToProps)(Authentication);
};