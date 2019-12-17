import React, { Component } from 'react'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import LoginMsgCmp from '../Admin/Includes_Admin/LoginMsgCmp'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'
import { fetchUsers, getAllUsers, searchUser, 
    clearFilterUserData,updateUser, clearMsg } from '../../Redux/Actions/UsersAction'


class Users extends Component{

    state = {
        search_data: '',
        search_check: false,
        dropdown_check: false,
        dropdown_search: '',
        checked: false,
        updateUserData: ''
    }

    componentDidMount() {
        store.dispatch(fetchUsers());
    }


    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSearch = (e) => {
        this.setState({ [e.target.id]: e.target.value })
        const data = {
            "id": e.target.id,
            "val": e.target.value
        }
        if(e.target.id === 'search_data') {
            this.setState({ search_check: true })
            this.setState({ dropdown_check: false })
            let dataCheck = e.target.value;
            if(dataCheck.length > 2) {
                store.dispatch(getAllUsers(data));       
            }
            else {
                store.dispatch(clearFilterUserData());
            }
        }

        if(e.target.id === 'dropdown_search') {
            this.setState({ dropdown_check: true })
            this.setState({ search_check: false })
            store.dispatch(getAllUsers(data));
        }
    }

    handleclear = (e) => {        
        this.setState({ dropdown_search: '' });
        this.setState({ search_data: '' });
        store.dispatch(clearFilterUserData());
    }

    updateUserData = (value, userId) => {
        let storeId = null;
        let searchVal = null;
        let finalVal = value;
        if(value === 'Owner') {
            finalVal = 'Customer';
        }
        else {
            finalVal = 'Owner'
        }
        if(this.state.dropdown_check) {
            searchVal = 'dropdown_search';
            storeId = this.state.dropdown_search;
        }
        if(this.state.search_check) {
            searchVal = 'search_data';
            storeId = this.state.search_data;
        }
        const data = {
            "userId": userId,
            "userRole": finalVal,
            searchVal,
            storeId
        }
        store.dispatch(updateUser(data));
    }

    render(){
        const { userstore, usersOfStore, updateUser, updateUserStatus } = this.props.users; 
        return(
            <div>
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history} />
                                <div className="col-md-9 dash_right" id="dash_right">
                                    <LoginMsgCmp heading="Users" />

                                    {/* USER SECTION START HERE */}
                                    <div>
                                        <div className="filter_section">
                                            <div className="row">
                                                <div className="col-md-12 text-left">
                                                    <h4>User Search Filters</h4>                                                    
                                                    { updateUserStatus ? <div className="alert alert-success"><p>{updateUser}</p></div> : '' }
                                                </div>
                                            </div>
										<div class="row">
										
                                            <div class="col-lg-4">
                                                <input type="text" id="search_data" value={this.state.search_data} onChange={this.handleSearch}  placeholder="User Name/Num" />
                                            </div>
                                            <div>
                                            </div>
                                            <div class="col-lg-4">
                                                <select id="dropdown_search" value={this.state.dropdown_search} onChange={this.handleSearch} defaultValue="">
                                                    <option>Select Store</option>
                                                    { userstore.length > 0 ? userstore.map((data) => (
                                                        <option key={data.storeid} value={data.storeid}>{ data.storename }</option>
                                                    )) : '' }
                                                </select>
                                            </div>
                                        
                                            <div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div>
                                                    <button className="clear_filters" onClick={this.handleclear}>Clear Filters</button>
                                                </div>
                                            </div>
										</div>
                                        <div className="parent_search_product">
                                            <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th style= {{width:'19%'}}>User Name</th>
                                                        <th style= {{width:'20%'}}>Store Name</th>
                                                        <th style= {{width:'20%',paddingLeft:'10px'}}>City</th>
                                                        <th style= {{width:'19%'}}>Role</th>
                                                        <th style= {{width:'22%',paddingLeft:'12px'}} >Action</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div className="search_list_product">
                                                <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <tbody>
                                                            { (usersOfStore.length > 0) ? 
                                                                usersOfStore.map((userData) => (
                                                                <tr key={userData.userid}>
                                                                    <td style= {{width:'20%'}}>{userData.firstname} {userData.lastname}</td>
                                                                    <td style= {{width:'20%'}}>{userData.storename}</td>
                                                                    <td style= {{width:'20%'}}>{userData.city}</td>
                                                                    <td style= {{width:'20%'}}>{userData.userrole}</td>              
                                                                    <td style= {{width:'20%'}}>
                                                                        {(userData.userrole === 'Owner' ) ? <button type="button" 
                                                                        value={this.state.updateUserData} id={userData.userrole} onClick={() => this.updateUserData(userData.userrole, userData.userid)} className="btn btn-secondary customer-btn">Make Customer</button>
                                                                            : <button type="button" value={this.state.updateUserData} id={userData.userrole} onClick={() => this.updateUserData(userData.userrole, userData.userid)} class="btn btn-primary">Make Owner</button> }
																	</td>
                                                                </tr>
                                                                ))
                                                                : <tr><td colSpan="2">No data found</td></tr> }
                                                        </tbody>
                                                </table>
												<div id="scrollToHere"></div>
                                            </div>
                                        </div>
									</div>                                      
                                    </div> 
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

Users.propTypes = {
    fetchUsers: PropTypes.func,
    getAllUsers: PropTypes.func,
    clearFilterUserData: PropTypes.func,
    searchUser : PropTypes.func,
    updateUser: PropTypes.func,
    clearMsg: PropTypes.func
};
  
const mapStateToProps = state => ({
    users: state.users
});


export default connect(mapStateToProps, { fetchUsers, getAllUsers, searchUser,updateUser, 
    clearFilterUserData, clearMsg })(Users);