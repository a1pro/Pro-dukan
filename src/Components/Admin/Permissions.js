import React, { Component } from 'react'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import LoginMsgCmp from '../Admin/Includes_Admin/LoginMsgCmp'
import AddNewPermission from './AddNewPermission'
import store from '../../store'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPermission } from '../../Redux/Actions/PermissionActions'
import axios from 'axios'

class Permissions extends Component {

    state = {
        isError: false,
        errors: '',
        isSuccess: false,
        successMsg: ''
    }

    componentDidMount() {
        store.dispatch(fetchPermission());
    }

    deleteRegion = (e) => {
        axios
            .delete(`http://API-URL-HERE/deletePermission/${e.target.id}`)
            .then(res => {
                this.setState({ successMsg: res.data });
                this.setState({ isSuccess: true });
                store.dispatch(fetchPermission());
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
        const { permission } = this.props.permissions;
        return(
            <div>
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history} />
                                <div className="col-md-9 dash_right" id="dash_right">
                                    <LoginMsgCmp heading="Permissions" />

                                    {/* PERMISSION SECTION START HERE */}
                                    <div>
                                        <div className="filter_section">
                                            <div className="row">
                                                <div className="col-md-12 text-left">
                                                    <h4>Current Permissions</h4>
                                                    { this.state.isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : ''  }
                                                    { this.state.isSuccess ? <div className="alert alert-success"><p>{this.state.successMsg}</p></div> : '' }
                                                </div>
                                            </div>
                                        <div className="parent_search_product permission_sec">
                                            <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Permission Code</th>
                                                        <th>Permission Name</th>
														<th>Action</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div className="search_list_product
											permission_sub_sec">
                                            <table class="product_filter cstm_ul table table-border table-stripped table-hover">
                                            <tbody>
                                                { (permission.length > 0) ? 
                                                    permission.map((permission) => (
                                                        <tr id={permission.permissioncd}>
                                                            <td>{permission.permissioncd}</td>
                                                            <td>{permission.permissionname}</td>
                                                            <td><button id={permission.permissioncd} onClick={this.deleteRegion}>Delete</button></td>
                                                        </tr>
                                                    ))
                                                : <tr><td colSpan="2">No data found</td></tr> }
                                            </tbody>       
										    </table> 
                                            </div>
                                        </div>
									</div>
                                    </div>
                                    <div><AddNewPermission props={this.props} /></div>
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

Permissions.propTypes = {
    fetchPermission: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    post: PropTypes.object
};
  
const mapStateToProps = state => ({
    permissions: state.permissions,
    post: state.permissions   
});


export default connect(mapStateToProps, { fetchPermission })(Permissions);