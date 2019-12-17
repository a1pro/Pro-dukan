import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import Footer from './Includes_Admin/Footer'
import Header from './Includes_Admin/Header'
import Sidebar from './Includes_Admin/Sidebar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Auth } from "aws-amplify"
import { destroySession } from '../../Redux/Actions/sessionAction'

class SingleProduct extends Component {
    // Date: 10-sep-19.
    
	constructor(props) {
        super(props);
		this.state = {
		  
          Load: false,
          product: [],
		  error: null,
      };
        
      
    }
	
    getLastLogin = (time) => {
        // Get time string.
        let realtime = new Date(time*1000);
        let lastLoginTimeHour = realtime.getHours();
        let lastLoginTimeMin = realtime.getMinutes();
        let lastLoginTimeSec = realtime.getSeconds();
        let finalTimeString = `${lastLoginTimeHour}:${lastLoginTimeMin}:${lastLoginTimeSec}`;

        // Get date string.
        let todate=realtime.getDate();
        let tomonth=realtime.getMonth()+1;
        let toyear=realtime.getFullYear();
        let finalDateString = `${toyear}-${tomonth}-${todate}`;

        return `${finalDateString} ${finalTimeString}`;
    }
    
	
	
    handleLogOut = async event => {
        event.preventDefault();
        try {
          Auth.signOut();
          this.props.destroySession();
        //   console.log();
        this.props.history.history.push('/');
        }catch(error) {
          console.log(error.message);
        }
      }

      componentDidMount() {
        
        const id = this.props.match.params.id;
        var url ="http://API-URL-HERE/"+id;
        axios
        .get(url)
        .then(res => {
          this.setState({ product: res.data, Load: true })
        })
       .catch(error => this.setState({ error, Load: false }));
        
       

      }

    render() {
        const sessionData = this.props.sessionData;
		const { hits, isLoading,Load, product } = this.state;
        
        

		if(Load) {
           // var path = window.location.protocol + '//' + window.location.host + '/someting';
		    var list = product.map( (item) => {
		        return <div key={item.itemnum} id={item.itemnum} > <div>Name - {item.itemname} </div><div><img src={window.location.protocol + '//' + window.location.host  + "/images/images/No_image.jpg"} width="30%" height="30%"   alt="productImage" /></div><div>Brand - {item.brand}</div> <div>Description - {item.description}</div><div>Product Type - {item.producttype}</div><div>keywords - {item.keywords}</div> </div>
		    });
			
	    }
		else{

			var list = <div>No Products</div>;
				
			}	
			
		
		
        return(
            <div>
                {/* <div id="loader-overflow">
                    <div id="loader3" className="loader-cont">Please enable JS</div>
                </div>	 */}
                <div id="wrap" className="boxed">
                    <div className="bg-white">
                        <Header history={this.props.history.history} />
                        <div className="dash_wrapper">
                            <div className="row">
                                <Sidebar history={this.props.history.history} />
                                <div className="col-md-9 dash_right">
                                    <div className="kc_mart">
                                        <div className="row">
                                            <div className="col-sm-10" style={{ textAlign: 'left' }}>
                                                <p className="welcome_text">Welcome Test - <span className="red_font"> Kc India Mart</span></p>
                                                <p className="overland">Overland Park</p>
                                                <p className="login">Last Login : { this.getLastLogin(sessionData.timeLogin) }</p>
                                            </div>
                                        </div>
                                    </div>
                               
								   <h4>Product Detail</h4>
								   <div class="product_filter"> {list} </div>
                                </div>
                            </div>
                        </div>
                        <Footer history={this.props.history.history} />
                    </div>
                </div>
            </div>
        );
    }
}

SingleProduct.propTypes = {
    sessionData: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    destroySession: PropTypes.func
}

const mapStateToProps = state => ({
    sessionData: state.session.userSession,
    isAuthenticated: state.session
});

export default connect(mapStateToProps, { destroySession })(SingleProduct);