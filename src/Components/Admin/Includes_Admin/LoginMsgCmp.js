import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Auth } from "aws-amplify"
import config from '../../../config'

class LoginMsgCmp extends Component {

    getLastLogin = (time) => {
        // Get time string.
        let realtime = new Date(time*1000);
        let lastLoginTimeHour = realtime.getHours();
        let lastLoginTimeMin = realtime.getMinutes();
        let lastLoginTimeSec = realtime.getSeconds();
        let finalTimeString = `${lastLoginTimeHour}:${lastLoginTimeMin}:${lastLoginTimeSec}`;

        // Get date string.
        let todate=realtime.getDate();
        let tomonth=realtime.getMonth()+1;
        let toyear=realtime.getFullYear();
        let finalDateString = `${toyear}-${tomonth}-${todate}`;

        return `${finalDateString} ${finalTimeString}`; 
    }

    render() {
        const sessionData =  this.props.sessionData;
        return(
            <div className="kc_mart">
                <div className="row">
				
					<div className="col-sm-4 dash_img_img">
                    <img className="dash_img" src= {`${config.base_url}images/produkaan_logo.png`} alt="Circular-Logo" width="60%" />
                        
                    </div>
					
					 <div className="col-sm-4"><h1>{this.props.heading}</h1>  </div>
				
                    <div className="col-sm-4" style={{ textAlign: 'left' }}>
                        <p className="welcome_text">Welcome Test - <span className="red_font"> Kc India Mart</span></p>
                        <p className="overland">Overland Park</p>
                        <p className="login">Last Login : { this.getLastLogin(sessionData.timeLogin) }</p>
                    </div>
					
                   
					
                    
                    {/* <div className="col-sm-2 padd-t">
                        <a href="/" className="logout-btn"  onClick={this.handleLogOut}>
                            LOG OUT
                        </a>
                    </div> */}
                </div>
            </div>
        );
    }
}

LoginMsgCmp.propTypes = {
    sessionData: PropTypes.array,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    sessionData: state.session.userSession,
    isAuthenticated: state.session
});

export default connect(mapStateToProps, {  })(LoginMsgCmp);