import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Account extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>
        <h1>Account</h1>
      </div>
    );
  }
}
Account.propTypes = {
  profile: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.loading,
});
export default connect(
  mapStateToProps,
  { getCurrentProfile },
)(Account);
