import React, { Component } from 'react'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Auth } from "aws-amplify"
import { destroySession } from '../../Redux/Actions/sessionAction'
import config from '../../config'
import LoginMsgCmp from '../Admin/Includes_Admin/LoginMsgCmp'

class Dashboard extends Component {
    // Date: 10-sep-19.
    handleLogOut = async event => {
        event.preventDefault();
        try {
          Auth.signOut();
          this.props.destroySession();
        //   console.log();
        this.props.history.history.push('/');
        }catch(error) {
          console.log(error.message);
        }
      }

    render() {
        const sessionData = this.props.sessionData;
        return(
            <div>
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history.history} />
                                <div className="col-md-9 pl-0 pr-0 dash_right">
                                    <LoginMsgCmp heading="Dashboard" />
                                    {/* <p className="img_center"><img className="Circle_logo" src="images/circle_logo.png" alt="Circular-Logo" width="60%" /></p> */}
                                </div>
                            </div>
                        </div>
                        <Footer history={this.props.history.history} />
                    </div>
                </div>
            </div>
        );
    };
};

Dashboard.propTypes = {
    sessionData: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    destroySession: PropTypes.func
}

const mapStateToProps = state => ({
    sessionData: state.session.userSession,
    isAuthenticated: state.session
});

export default connect(mapStateToProps, {  })(Dashboard);