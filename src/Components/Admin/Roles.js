import React, { Component } from 'react'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import LoginMsgCmp from '../Admin/Includes_Admin/LoginMsgCmp'
import AddNewRole from './AddNewRole'
import { connect } from 'react-redux'
import store from '../../store'
import PropTypes from 'prop-types'
import { fetchRoles } from '../../Redux/Actions/RoleActions'
import axios from 'axios'


class Roles extends Component {

    state = {
        isError: false,
        errors: '',
        isSuccess: false,
        successMsg: ''
    }

    componentDidMount() {
        store.dispatch(fetchRoles());	
    }

    
    //DELETE ROLE FUNCTION
    deleteRegion = (e) => {
        axios
            .delete(`http://API-URL-HERE/deleteRole/${e.target.id}`)
            .then(res => {
                this.setState({ successMsg: res.data });
                this.setState({ isSuccess: true });
                store.dispatch(fetchRoles());
                setTimeout(() => {
                    this.setState({ successMsg: '' });
                    this.setState({ isSuccess: false });
                }, 3000);
            })
            .catch(err => {
                this.setState({
                    errors: err.data,
                    isError: true
                });
                setTimeout(() => {
                    this.setState({
                        errors: '',
                        isError: false
                    });
                }, 3000);
            });
    }

    render() {
        const { rolesTypes } = this.props.roles;
        return(
            <div>
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history} />
                                <div className="col-md-9 dash_right" id="dash_right">
                                    <LoginMsgCmp heading="Roles" />

                                    {/* REGION SECTION START HERE */}
                                    <div>
                                        <div className="filter_section">
                                            <div className="row">
                                                <div className="col-md-12 text-left">
                                                    <h4>Current Roles</h4>
                                                    { this.state.isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : ''  }
                                                    { this.state.isSuccess ? <div className="alert alert-success"><p>{this.state.successMsg}</p></div> : '' }
                                                </div>
                                            </div>
                                        <div className="parent_search_product Roles_sec">
                                            <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Role Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                                <div className="search_list_product Roles_sub_sec">
                                                    <table class="product_filter cstm_ul table table-border table-stripped table-hover">
										                <tbody>
                                                            { (rolesTypes.length > 0) ? 
                                                                rolesTypes.map((role) => (
                                                                <tr key={role.rolename}>
                                                                    <td>{role.rolename}</td>
                                                                    <td><button id={role.rolename} onClick={this.deleteRegion}>Delete</button></td>
                                                                </tr>
                                                                ))
                                                                : <tr><td colSpan="2">No data found</td></tr> }
                                                        </tbody>
										            </table>
                                                </div>
                                        </div>
									</div>
                                    </div>
                                    <div><AddNewRole props={this.props} /></div>
                                </div>
                            </div>
                        </div>
                        <Footer history={this.props.history} />
                    </div>
                </div>
            </div>
        );
    }
}

Roles.propTypes = {
    fetchRoles: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,    
};
  
const mapStateToProps = state => ({
    roles: state.roles,    
});


export default connect(mapStateToProps, { fetchRoles })(Roles);