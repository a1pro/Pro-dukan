import React, { Component } from 'react'
import { Tabs, Tab, Panel } from '@bumaga/tabs'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFeatures } from '../../Redux/Actions/FeatureActions'
import store from '../../store'
import axios from 'axios'

class AddNewFeature extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  	title: '',
		  	body: '',
		  	description: '',
		  	isError: false,
			errMsg: '',
			isSuccess: false,
			successMsg: ''
		};
	
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onChange(e) {
		this.setState({ isError: false, errors: '' });
		this.setState({ isSuccess: false, successMsg: '' });
		this.setState({ [e.target.name]: e.target.value });
	}
	
	onSubmit(e) {
		e.preventDefault();
		const { title, body, description } = this.state;
		const oldArrayRegion = this.props.props.features.feacturesTypes;
		if(title === '') {
			this.setState({ isError: true, errors: 'Feature Code field is required.' })
			return false;
		}
		if(body === '') {
			this.setState({ isError: true, errors: 'Feature Name field is required.' })
			return false;
		}
		if(description === '') {
			this.setState({ isError: true, errors: 'Description field is required.' })
			return false;
		}

		for(let i = 0; i < oldArrayRegion.length; i++) {
            if(title === oldArrayRegion[i].featurecd) {
                this.setState({ errors: 'Please enter unique Feature  Code.' });
                this.setState({ isError: true });
                return false;
            }
        }

		const post = {
		  "featureCd": title,
		  "featureName": body,
		  "description": description
		}

		axios.post('http://API-URL-HERE/addFeature', post, {
			header: {
				"Content-type": "application/json"
			}
		})
		.then((response) => {
			this.setState({ isSuccess: true, successMsg: response.data, title: '', body: '', description:'' });
			store.dispatch(fetchFeatures())
			setTimeout(() => {
				this.setState({ isError: false, errors: '' });
				this.setState({ isSuccess: false, successMsg: '' });
			}, 2000)
		})
		.catch((err) => {
			this.setState({ isError: true, errors: err.data });
		});

	}
  
    render() {
        return(
            <Tabs>
                <div id="single_product_div_parent">
                    <div className="row">
				        <ul>
				            <li className="li active">
                                <Tab>
                                    <button className="cstm_product">New Feature</button>
                                </Tab>
				            </li>
             	        </ul>
                        <Panel>
                            <div className="custom_Feature_sec">
								<form onSubmit={this.onSubmit}>
									{ this.state.isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : ''  }
                                	{ this.state.isSuccess ? <div className="alert alert-success"><p>{this.state.successMsg}</p></div> : '' }
								<div className="row">
									<div className="col-md-4">
										<label>Feature Code</label>
										<input type="text" id="name" name="title"
										onChange={this.onChange}
										value={this.state.title} placeholder="Enter Feature Name"/>
									</div>
									<div className="col-md-4">
									  <label>Feature Name</label>
										<input type="text" name="body"
										onChange={this.onChange}
										value={this.state.body} id="name" placeholder="Enter Feature Name"/>
										
									</div>
									<div className="col-md-4">
									  <label>Description</label>
										<input type="text" name="description"
										onChange={this.onChange}
										value={this.state.description} id="name" placeholder="Enter Feature Name"/>
										
									</div>
								</div>
								<div className="row">
								  <div className="col-md-6"></div>
									<div className="col-md-6">
										<button type="submit">Add New Feature</button>
									</div>
								</div>
								</form>					
							
                                
                            </div>
                        </Panel>
			        </div>
                </div>
            </Tabs>
        );
    };
};

AddNewFeature.propTypes = {
	fetchFeatures: PropTypes.func
  };
  
  export default connect(null, { fetchFeatures })(AddNewFeature);