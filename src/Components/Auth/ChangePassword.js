import React, { Component } from 'react'
import FormErrors from "../../FormErrors"
import Validate from "../error/FormValidation"
import { Auth } from "aws-amplify"

export default class ChangePassword extends Component {

    state = {
        oldpassword: "",
        newpassword: "",
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
        try {
          const user = await Auth.currentAuthenticatedUser();
        //   console.log(user);
          await Auth.changePassword(
            user,
            this.state.oldpassword,
            this.state.newpassword
          );
        //   this.props.history.push("/");
        //   this.props.history.push("/changepasswordconfirmation");
        } catch (error) {
          let err = null;
          !error.message ? err = { "message": error } : err = error;
          this.setState({
            errors: { ...this.state.errors, cognito: err }
          });
          console.log(err);
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
                <div id="first">
                    <div className="myform form ">
                        <div className="logo mb-3">
                            <div className="col-md-12 text-center">
                                <h2 className="section-title2 font-light text-center p-0">Client Login</h2>
                            </div>
                        </div>
                        <FormErrors formerrors={this.state.errors} />
                        <form className="login_frm" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input 
                                    className="form-control" 
                                    type="password"
                                    id="oldpassword"
                                    placeholder="Old password"
                                    value={this.state.oldpassword}
                                    onChange={this.onInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    id="newpassword"
                                    placeholder="New password"
                                    value={this.state.newpassword}
                                    onChange={this.onInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    id="confirmpassword"
                                    placeholder="Confirm password"
                                    value={this.state.confirmpassword}
                                    onChange={this.onInputChange}
                                />
                            </div>
                            {/* <div className="form-group">
                                <p className="text-right">
                                    <a href="/ForgotPassword">Forgot Password?</a>
                                </p>
                            </div> */}
                            <div className="col-md-12 text-center ">
                                <button className="button medium rounded gray">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}