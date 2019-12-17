import React, { Component } from 'react'
import Header from './Includes_Admin/Header'
import Footer from './Includes_Admin/Footer'
import Sidebar from './Includes_Admin/Sidebar'

class Profile extends Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <Header history={ this.props.history } />
                </div>
                <div className="row" style={{ marginTop: '108px' }}>
                    <Sidebar history={ this.props.history } />
                    <div className="col-md-9" style={{ textAlign: 'left' }}>
                        Profile page
                    </div>
                </div>
                <div className="row">
                    <Footer history={ this.props.history } />
                </div>
            </div>
        );
    };
};


export default Profile;