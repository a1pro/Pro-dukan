import React, { Component } from 'react'
import { Tabs, Tab, Panel } from '@bumaga/tabs'
import axios from 'axios';
import store from '../../store'
import { getRegoinAll } from '../../Redux/Actions/regionAction'

class AddNewRegion extends Component {

    state = {
        name: '',
        errors: '',
        isError: false,
        successMsg: '',
        isSuccess: false
    }

    updateVal = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        this.setState({ errors: '' });
        this.setState({ isError: false });
    }

    // ADD NEW REGION FUNCITON --- RAHUL KUMAR 04-NOV-2019
    addNewRegion = (e) => {
        e.preventDefault();
        const oldArrayRegion = this.props.props.regionData.getAllRegion;
        if(this.state.name === null || this.state.name === '') {
            this.setState({ errors: 'Please enter unique Region.' });
            this.setState({ isError: true });
            return false;
        }
        for(let i = 0; i < oldArrayRegion.length; i++) {
            if(this.state.name === oldArrayRegion[i].region) {
                this.setState({ errors: 'Please enter unique Region.' });
                this.setState({ isError: true });
                return false;
            }
        }

        const insertDataRegion = {
            "region": this.state.name
        }

        axios
            .post('http://API-URL-HERE/addRegion', insertDataRegion,{
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(res => {
                console.log(res);
                this.setState({ name: '' });
                this.setState({ successMsg: res.data });
                this.setState({ isSuccess: true });
                store.dispatch(getRegoinAll());
                setTimeout(() => {
                    this.setState({ successMsg: '' });
                    this.setState({ isSuccess: false });
                }, 3000);
            })
            .catch(err => {
                this.setState({ errors: 'Please try after some time.' });
                this.setState({ isError: true });
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
                                    <button className="cstm_product">New Region</button>
                                </Tab>
				            </li>
             	        </ul>
                        <Panel>
                            <div className="custom_region_sec">
								<div className="row">
                                    <form onSubmit={this.addNewRegion}>
                                        <div className="col-md-6">
                                            { this.state.isError ? <div className="alert alert-danger"><p>{this.state.errors}</p></div> : ''  }
                                            { this.state.isSuccess ? <div className="alert alert-success"><p>{this.state.successMsg}</p></div> : '' }
                                            <label>Region Name</label>
                                            <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.updateVal} placeholder="Enter Region Name"/>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="submit">Add New Region</button>
                                        </div>
                                    </form>
								</div>
                            </div>
                        </Panel>
			        </div>
                </div>
            </Tabs>
        );
    };
};

export default AddNewRegion;