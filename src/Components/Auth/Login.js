import React, { Component } from 'react'
import Navbar from '../Navbar'
// import ChangePassword from './ChangePassword'
import FormErrors from "../../FormErrors"
import Validate from "../error/FormValidation"
// import Logout from './Logout'
import { Auth , Storage} from "aws-amplify"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSession, destroySession } from '../../Redux/Actions/sessionAction'


class Login extends Component {
  
    state = {
        username: "",
        password: "",
        errors: {
          cognito: null,
          blankfield: false
        }
      };
    
      clearErrorState = () => {
        this.setState({
          errors: {
            cognito: null,
            blankfield: false
          }
        });
      };

      handleLogOut = async event => {
        event.preventDefault();
        try {
          Auth.signOut();
          this.props.destroySession();
        }catch(error) {
          console.log(error.message);
        }
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
          const user = await Auth.signIn(this.state.username, this.state.password);
          console.log(user);
            if(user) {
              const sessionDataRedux = {
                jwtToken: user.signInUserSession.accessToken.jwtToken,
                username: user.username,
                email: user.attributes.email,
                email_verified: user.attributes.email_verified,
                middle_name: user.attributes.middle_name,
                name: user.attributes.name,
                phone_number: user.attributes.phone_number,
                phone_number_verified: user.attributes.phone_number_verified,
                sub: user.attributes.sub,
                scope: (user.signInUserSession.accessToken.payload.scope) ? user.signInUserSession.accessToken.payload.scope : 0,
                timeLogin: user.signInUserSession.accessToken.payload.auth_time,
              }
              this.props.getSession(sessionDataRedux);
            }
            if(user.signInUserSession.accessToken.payload.scope === 'aws.cognito.signin.user.admin') {
              this.props.history.push("/Admin");
            }
        }catch(error) {
          let err = null;
          !error.message ? err = { "message": error } : err = error;
          this.setState({
            errors: {
              ...this.state.errors,
              cognito: err
            }
          });
        }
      };
    
      onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value          
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
      };

  render() {
    console.log(Storage);
    const  sessionData  = this.props.sessionData;
    const { isAuthenticated } = this.props.isAuthenticated;
    const login_forms = (
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
                          type="text"
                          className="form-control"
                          id="username"
                          aria-describedby="usernameHelp"
                          placeholder="Enter username or email"
                          value={this.state.username}                         
                          onChange={this.onInputChange}
                      />
                      
                  </div>
                  <div className="form-group">
                      <input 
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter Password"
                          value={this.state.password}
                          onChange={this.onInputChange}
                      />
                  </div>
                  <div className="col-md-12 text-center ">
                      <button className="button medium rounded gray">
                          LOGIN
                      </button>
                  </div>
              </form>
          </div>
      </div>
      </div>
    );
    
    return(
    <div>
        <div id="wrap" className="boxed">
			    <div className="bg-white">
			      <Navbar />
                <div className="page-title-cont page-title-large2-cont bg-white">
                    <div className="relative container align-left">
                        <div className="row">
			                <div className="col-md-3"></div>
                            <div className="col-md-6">

                            { !isAuthenticated ? login_forms : <div>
                                  <h3>Welcome { sessionData.username }</h3>
                                  <a href="/" className="btn btn-danger" onClick={this.handleLogOut}>Logout</a>
                                </div> }
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
              </div>
		      </div>
        </div>
    </div>
    )
  }
}

Login.propTypes = {
    getSession: PropTypes.func.isRequired,
    destroySession: PropTypes.func.isRequired,
    sessionData: PropTypes.array,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    sessionData: state.session.userSession,
    isAuthenticated: state.session
});

export default connect(mapStateToProps, { getSession, destroySession })(Login);
