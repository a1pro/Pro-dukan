import React, { Component } from 'react'
import Navbar from '../Navbar'
import FormErrors from "../../FormErrors"
import Validate from "../error/FormValidation"
import { Auth } from 'aws-amplify'

export default class Signup extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
          cognito: null,
          blankfield: false,
          passwordmatch: false
        }
      }
    
      clearErrorState = () => {
        this.setState({
          errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
          }
        });
      }
    
      handleSubmit = async event => {
        event.preventDefault();
    
        // Form validation
        this.clearErrorState();
        const error = Validate(event, this.state);
        if (error) {
          this.setState({
            errors: { ...this.state.errors, ...error }
          });
        }
    
        // AWS Cognito integration here
        const { username, email, password } = this.state;
        try {
          const signUpResponse = await Auth.signUp({
            username,
            password,
            attributes: {
              email: email
            }
          });
          this.props.history.push("/");
          console.log(signUpResponse);
        } catch (error) {
          let err = null;
          !error.message ? err = { "message": error } : err = error;
          this.setState({
            errors: {
              ...this.state.errors,
              cognito: err
            }
          });
        }
      }
    
      onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
      }

    render() {
        return(
            <div>
                <div id="wrap" className="boxed ">
			    <div className="bg-white">
			      <Navbar />
            <div className="page-title-cont page-title-large2-cont bg-white">
              <div className="relative container align-left">
                <div className="row">
			            <div className="col-md-3"></div>
                  <div className="col-md-6">
                  
                    <div id="first">
                      <div className="myform form ">
                        <div className="logo mb-3">
                          <div className="col-md-12 text-center">
                            <h2 className="section-title2 font-light text-center p-0">Sign Up</h2>
                          </div>
                        </div>
                        <FormErrors formerrors={this.state.errors} />
                        <form onSubmit={this.handleSubmit} name="registration">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">User name</label>
                            <input 
                                className="form-control" 
                                type="text"
                                id="username"
                                aria-describedby="userNameHelp"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={this.onInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input 
                                className="form-control" 
                                type="email"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password</label>
                            <input 
                                className="form-control" 
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Confirm Password</label>
                            <input 
                                className="form-control" 
                                type="password"
                                id="confirmpassword"
                                placeholder="Confirm password"
                                value={this.state.confirmpassword}
                                onChange={this.onInputChange}
                            />
                          </div>
                          <div className="col-md-12 text-center mb-3">
                            <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Register</button>
                          </div>
                          <div className="col-md-12 ">
                            <div className="form-group">
                              <p className="text-center">
                                <a href="/Login">Already have an account?</a>
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                  </div>
                </div>
                <div className="search-results">
              </div>
              <footer id="footer4" className="page-section pt-60 pb-50 footer2-black">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 col-sm-4 widget">
                      <div className="logo-footer-cont">
                        <a href="index.html">
                          <img className="logo-footer" src="images/produkaan_logo.png" alt="logo" />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 widget">
                      <h4>Navigate</h4>
                      <ul className="links-list a-text-cont a-text-main-cont font-poppins">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="shortcodes.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="index-portfolio.html">Clients</a></li>
                        <li><a href="index-blog.html">Contact Us</a></li>
                        <li><a href="index-shop.html">Client Portal</a></li>
                      </ul>
                    </div>
                    <div className="col-md-4 col-sm-4 widget">
                      <h4>Find Us Here</h4>
                      <div className="footer2-text-cont">
                        <address>
                              8552 West 133rd St<br/>
                            Overland Park, KS 66213
                        </address>
                      </div>
                      <div className="footer2-text-cont">
                        913-526-1145<br/>
                        <a className="a-text" href="mailto:info@haswell.com">info@produkaan.com</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer2-copy-cont clearfix">
                    <div className="left">
                      <a className="footer2-copy" href="#tp" target="_blank">&copy; produkaan</a>
                    </div>
                  </div>
                </div>
              </footer>
              {/* <p id="back-top">
                <a href="#top" title="Back to Top"><span class="icon icon-arrows-up"></span></a>
              </p> */}
            </div>
		      </div>
        </div>
      </div>
        );
    };
}