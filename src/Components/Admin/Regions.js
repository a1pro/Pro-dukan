import React, { Component } from 'react'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import LoginMsgCmp from '../Admin/Includes_Admin/LoginMsgCmp'
import AddNewRegion from './AddNewRegion'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from '../../store'
import { getRegoinAll } from '../../Redux/Actions/regionAction'
import axios from 'axios'

class Regions extends Component {

    state = {
        error: '',
        isError: false,
        successMsg: '',
        isSuccess: false
    }

    componentDidMount() {
        store.dispatch(getRegoinAll());
    }

    // DELETE REGION FUNCTION --- RAHUL KUMAR 04-NOV-19.
    deleteRegion = (e) => {
        axios
            .delete(`http://API-URL-HERE/deleteRegion/${e.target.id}`)
            .then(res => {
                this.setState({ successMsg: res.data });
                this.setState({ isSuccess: true });
                store.dispatch(getRegoinAll());
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
        const { getAllRegion } = this.props.regionData;
        return(
            <div>
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history} />
                                <div className="col-md-9 dash_right" id="dash_right">
                                    <LoginMsgCmp heading="Regions" />

                                    {/* REGION SECTION START HERE */}
                                    <div>
                                        <div className="filter_section">
                                            <div className="row">
                                                <div className="col-md-12 text-left">
                                                    <h4>Current Region</h4>
                                                    { this.state.isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : ''  }
                                                    { this.state.isSuccess ? <div className="alert alert-success"><p>{this.state.successMsg}</p></div> : '' }
                                                </div>
                                            </div>
                                        <div className="parent_search_product region_sec">
                                            <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Region Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            
										<div class="search_list_product region_sub_sec region_button">
										<table class="product_filter cstm_ul table table-border table-stripped table-hover">
										<tbody>
                                            { (getAllRegion.length > 0) ? 
                                                getAllRegion.map((region) => (
                                                    <tr id={region.region}>
                                                        <td>{region.region}</td>
                                                        <td><button id={region.region} onClick={this.deleteRegion}>Delete</button></td>
                                                    </tr>
                                                ))
                                                : <tr><td colSpan="2">No data found</td></tr> }
										</tbody>
										</table>
										</div>
                                        </div>
									</div>
                                    </div>
                                    <div><AddNewRegion props={this.props} /></div>
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

Regions.propTypes = {
    getRegoinAll: PropTypes.func
}
  
const mapStateToProps = state => ({
    regionData: state.regionDetail
});
  
export default connect(mapStateToProps, { getRegoinAll })(Regions);