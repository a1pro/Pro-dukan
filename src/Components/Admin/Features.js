import React, { Component } from 'react'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import LoginMsgCmp from '../Admin/Includes_Admin/LoginMsgCmp'
import store from '../../store'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchFeatures, createPost } from '../../Redux/Actions/FeatureActions'
import AddNewFeature from './AddNewFeature'
import config from '../../config'
import axios from 'axios'

class Features extends Component {

    state = {
        isError: false,
        errors: '',
        isSuccess: false,
        successMsg: ''
    }

    componentDidMount() {
        store.dispatch(fetchFeatures());
    }

    /*componentWillReceiveProps(nextProps) {
        if(nextProps.post) {
          this.props.posts.unshift(nextProps.post);
        }
      }*/

    deleteRegion = (e) => {
        axios
            .delete(`http://API-URL-HERE/deleteFeature/${e.target.id}`)
            .then(res => {
                this.setState({ successMsg: res.data });
                this.setState({ isSuccess: true });
                store.dispatch(fetchFeatures());
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
        const { feacturesTypes } = this.props.features;
        return(
            <div>
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history} />
                                <div className="col-md-9 dash_right" id="dash_right">
                                    <LoginMsgCmp heading="Features" />

                                    {/* FEATURE SECTION START HERE */}
                                    <div>
                                        <div className="filter_section">
                                            <div className="row">
                                                <div className="col-md-12 text-left">
                                                    <h4>Current Features</h4>
                                                    { this.state.isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : ''  }
                                                    { this.state.isSuccess ? <div className="alert alert-success"><p>{this.state.successMsg}</p></div> : '' }
                                                </div>
                                            </div>
                                        <div className="parent_search_product feature_sec">
                                            <table className="product_filter cstm_ul table table-border table-stripped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Feature Code</th>
                                                        <th>Feature Name</th>
														<th>Action</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div className="search_list_product feature_sub_sec">
                                            <table class="product_filter cstm_ul table table-border table-stripped table-hover">
                                            <tbody>
                                                { (feacturesTypes.length > 0) ? 
                                                    feacturesTypes.map((feacture) => (
                                                        <tr key={feacture.featurecd}>
                                                            <td>{feacture.featurecd}</td>
                                                            <td>{feacture.featurename}</td>
                                                            <td><button id={feacture.featurecd} onClick={this.deleteRegion}>Delete</button></td>
                                                        </tr>
                                                    ))
                                                : <tr><td colSpan="2">No data found</td></tr> }
                                            </tbody>       
										    </table>
                                            </div>
                                        </div>
									</div>
									<div><AddNewFeature props={this.props}/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer history={this.props.history} />
                    </div>
                </div>
            </div>
        )
    }
}

Features.propTypes = {
    fetchFeatures: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
};
  
const mapStateToProps = state => ({
    features: state.features,
});


export default connect(mapStateToProps, { fetchFeatures })(Features);