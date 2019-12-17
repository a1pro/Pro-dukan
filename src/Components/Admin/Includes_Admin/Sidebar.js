import React, {Component} from 'react'
import config from '../../../config'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Auth } from "aws-amplify"
import LoginMsgCmp from './LoginMsgCmp'
import { destroySession } from '../../../Redux/Actions/sessionAction'

class Sidebar extends Component {

    GetAttr(e) {
        let dropDownL = document.getElementsByClassName('dropdown-btn')[e];
        dropDownL.classList.toggle('active');
        let showDivDrop = dropDownL.nextElementSibling;
        if(showDivDrop.style.display === 'block') {
            showDivDrop.style.display = 'none';
        }
        else {
            showDivDrop.style.display = 'block';
        }
    }

    handleLogOut = async event => {
        event.preventDefault();
        try {
            Auth.signOut();
            this.props.destroySession();
            this.props.history.push('/');
        }
        catch(error) {
            console.log(error.message);
        }
    }

    render() {
        return(
            <div className="col-md-3 pl-0">
                <div className="sidenav" id="sidenav">
                    {/* <button className="dropdown-btn" onClick={this.GetAttr.bind(this, 0)}>Dashboard
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">

                    </div>
                    <hr className="side_separator" />
                    <button className="dropdown-btn" onClick={this.GetAttr.bind(this, 1)}>Admin Operations 
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">
                        <a onClick={() => { this.props.history.push('/Admin/Features'); }}><i className="fa fa-caret-right"></i>Features</a>
                        <a href="#"><i className="fa fa-caret-right"></i>Permissions</a>
                        <a href="#"><i className="fa fa-caret-right"></i>Product Images</a>
                        <a href="#"><i className="fa fa-caret-right"></i>Product Skus</a>
                        <a href="#"><i className="fa fa-caret-right"></i>Regions</a>
                        <a href="#"><i className="fa fa-caret-right"></i>Roles</a>
                        <a href="#"><i className="fa fa-caret-right"></i>Stores</a>
                        <a href="#"><i className="fa fa-caret-right"></i>Users</a>
                    </div>
                    <hr className="side_separator" /> */}
                    <ul className="side_nav">
                        <li>
                            <span>
                                <img src={`${config.base_url}images/images/Dashboard-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={() => { this.props.history.push('/Admin'); }}>dashboard</button>
                        </li>
                        <li>
                            <span>
                                <img src={`${config.base_url}images/images/Admin-icon.png`} />
                            </span>
                            <button className="side_button" onClick={(e) => { e.preventDefault(); }}>admin operations</button>
                        </li>
                        <li className="sub_menu">
                            <span>
                                <img src={`${config.base_url}images/images/Features-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={() => { this.props.history.push('/Admin/Features'); }}>Features</button>
                        </li>
                        <li className="sub_menu"> 
                            <span>
                                <img src={`${config.base_url}images/images/Permissions-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={() => { this.props.history.push('/Admin/Permissions'); }}>Permissions</button>
                        </li>
                      
                        <li className="sub_menu">
                            <span>
                                <img src={`${config.base_url}images/images/product-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={() => { this.props.history.push('/Admin/ProductCatalog'); }}>Product Catalog</button>
                        </li>
                        <li className="sub_menu">
                            <span className="region_sec">
                                <img src={`${config.base_url}images/images/Regions-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={() => { this.props.history.push('/Admin/Regions'); }}>Regions</button>
                        </li>
                        <li className="sub_menu">
                            <span>
                                <img src={`${config.base_url}images/images/Roles-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={() => { this.props.history.push('/Admin/Roles'); }}>Roles</button>
                        </li>
                        <li className="sub_menu">
                            <span>
                                <img src={`${config.base_url}images/images/Stores-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={() => { this.props.history.push('/Admin/Stores'); }}>Stores</button>
                        </li>
                        <li className="sub_menu">
                            <span>
                                <img src={`${config.base_url}images/images/USER-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={() => { this.props.history.push('/Admin/Users'); }}>Users</button>
                        </li>
                        <li>
                            <span>
                                <img src={`${config.base_url}images/images/USER-icon.png`} />
                            </span>
                            <button className="side_button"  onClick={this.handleLogOut}>Log Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    sessionData: state.session.userSession,
    isAuthenticated: state.session
});

export default connect(mapStateToProps, { destroySession })(Sidebar);