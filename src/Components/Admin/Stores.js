import React, { Component } from 'react'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import LoginMsgCmp from '../Admin/Includes_Admin/LoginMsgCmp'

class Stores extends Component{
    render(){
        return(
            <div>
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history} />
                                <div className="col-md-9 dash_right" id="dash_right">
                                    <LoginMsgCmp heading="Stores" />

                                    {/* STORES SECTION START HERE */}
                                    <div>
                                        <div className="filter_section">
                                            <div className="row">
                                                <div className="col-md-12 text-left">
                                                    <h4>Stores Search Filters</h4>                                                    
                                                </div>
                                            </div>
										<div class="row">
										
                                            <div class="col-lg-2 col-half-offset">
                                                <input type="text" id="search_data" placeholder="Store Name/Num" />
                                            </div>
                                            <div>
                                            </div>
                                            <div class="col-lg-2 col-half-offset">
                                                <select id="dropdown_search" defaultValue="">
                                                    <option>Store Name</option>
                                                    
                                                </select>
                                            </div>
                                        
                                            <div>
                                            </div>
                                            <div class="col-lg-2 col-half-offset">
                                                <div>
                                                    <button className="clear_filters">Clear Filters</button>
                                                </div>
                                            </div>
										</div>
                                        <div className="parent_search_product">
                                            <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>User Name</th>
                                                        <th>Store Name</th>
                                                        <th>City</th>
                                                        <th>Role</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div className="search_list_product">
                                                <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <tbody>
                                                            <tr><td colSpan="2">No data found</td></tr>
                                                        </tbody>
                                                </table>
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

export default Stores;