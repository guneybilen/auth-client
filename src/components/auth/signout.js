import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }
  render() {
    return (
      <div>
        Sorry to see you go...
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}



export default connect(mapStateToProps, actions)(Signout);