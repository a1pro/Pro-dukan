import React, { Component } from 'react'
import { Tabs, Tab, Panel } from '@bumaga/tabs'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRoles } from '../../Redux/Actions/RoleActions'
import store from '../../store'
import axios from 'axios'

class AddNewRole extends Component {

    constructor(props) {
		super(props);
		this.state = {
            name: '',
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
		const { name } = this.state;
		const oldArrayRegion = this.props.props.roles.rolesTypes;
		if(name === '') {
			this.setState({ isError: true, errors: 'Role Name field is required.' })
			return false;
		}

		for(let i = 0; i < oldArrayRegion.length; i++) {
            if(name === oldArrayRegion[i].rolename) {
                this.setState({ errors: 'Please enter unique Role.' });
                this.setState({ isError: true });
                return false;
            }
        }

		const post = {
		    "roleName": name,
		}

		axios.post('http://API-URL-HERE/addRole', post, {
			header: {
				"Content-type": "application/json"
			}
		})
		.then((response) => {
			this.setState({ isSuccess: true, successMsg: response.data, name: '' });
			store.dispatch(fetchRoles())
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
                                    <button className="cstm_product">New Role</button>
                                </Tab>
				            </li>
             	        </ul>
                        <Panel>
                            <div className="custom_role_sec">
								<div className="row">
                                    <form onSubmit={this.onSubmit}>
                                    { this.state.isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : ''  }
                                { this.state.isSuccess ? <div className="alert alert-success"><p>{this.state.successMsg}</p></div> : '' }
                                        <div className="col-md-6">
                                            <label>Role Name</label>
                                            <input type="text" id="name" name="name" onChange={this.onChange}
										    value={this.state.name}  placeholder="Enter Role Name"/>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="submit">Add New Role</button>
                                        </div>
                                    </form>
								</div>
                            </div>
                        </Panel>
			        </div>
                </div>
            </Tabs>
        )
    }
}

AddNewRole.propTypes = {
	fetchRoles: PropTypes.func
};
  
  export default connect(null, { fetchRoles })(AddNewRole);