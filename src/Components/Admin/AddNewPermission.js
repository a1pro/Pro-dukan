import React, { Component } from 'react'
import { Tabs, Tab, Panel } from '@bumaga/tabs'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPermission } from '../../Redux/Actions/PermissionActions'
import store from '../../store'
import axios from 'axios'

class AddNewPermission extends Component {

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
		const oldArrayRegion = this.props.props.permissions.permission;
		if(title === '') {
			this.setState({ isError: true, errors: 'Permission Code field is required.' })
			return false;
		}
		if(body === '') {
			this.setState({ isError: true, errors: 'Permission Name field is required.' })
			return false;
		}
		if(description === '') {
			this.setState({ isError: true, errors: 'Description field is required.' })
			return false;
		}
		
		for(let i = 0; i < oldArrayRegion.length; i++) {
            if(title === oldArrayRegion[i].permissioncd) {
                this.setState({ errors: 'Please enter unique Permission Code.' });
                this.setState({ isError: true });
                return false;
            }
        }

		const post = {
		  "permissionCd": title,
		  "permissionName": body,
		  "description": description
		}
		axios.post('http://API-URL-HERE/addPermission', post, {
			header: {
				"Content-type": "application/json"
			}
		})
		.then((response) => {
			this.setState({ isSuccess: true, successMsg: response.data, title: '', body: '', description:'' });
			store.dispatch(fetchPermission())
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
                                    <button className="cstm_product">New Permission</button>
                                </Tab>
				            </li>
             	        </ul>
                        <Panel>
                            <div className="custom_Permission_sec">
                            <form onSubmit={this.onSubmit}>
								{ this.state.isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : ''  }
                                { this.state.isSuccess ? <div className="alert alert-success"><p>{this.state.successMsg}</p></div> : '' }
								<div className="row">
									<div className="col-md-4">
										<label>Permission Code</label>
										<input type="text" id="name" name="title"
										onChange={this.onChange}
										value={this.state.title} placeholder="Enter Permission Name"/>
									</div>
									<div className="col-md-4">
									  <label>Permission Name</label>
										<input type="text" name="body"
										onChange={this.onChange}
										value={this.state.body} id="name" placeholder="Enter Permission Name"/>
										
									</div>
									<div className="col-md-4">
									  <label>Description</label>
										<input type="text" name="description"
										onChange={this.onChange}
										value={this.state.description} id="name" placeholder="Enter Permission Name"/>
										
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
        )
    }
}

AddNewPermission.propTypes = {
	fetchPermission: PropTypes.func
  };
  
  export default connect(null, { fetchPermission })(AddNewPermission);