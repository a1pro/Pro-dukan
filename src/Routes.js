import React, { Component } from 'react'
import Login from './Components/Auth/Login'
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dash from './Components/Admin'
import NotFound from './Components/NotFound'
import Features from './Components/Admin/Features'
import Roles from './Components/Admin/Roles'
import Regions from './Components/Admin/Regions'
import Permissions from './Components/Admin/Permissions'
import ProductCatalog from './Components/Admin/ProductCatalog'
import SingleProduct from './Components/Admin/SingleProduct'
import { getSession } from './Redux/Actions/sessionAction'
import Users from './Components/Admin/Users'
import Stores from './Components/Admin/Stores'

class Routes extends Component {

    // getBaseName = (auth, role) => {
    //     if(auth) {
    //         if(role === 'Admin') {
    //             return '/Admin';
    //         }
    //     }
    // }

    render() {
        const sessionData = this.props.sessionData;
        const { isAuthenticated } = this.props.isAuthenticated;
        const { userRole } = this.props.userRole;
        // Default Routes
        const DefaultRoute = (
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="*" component={NotFound} />
                </Switch>
            </div>
        );
        // Admin Routes
        const AdminRoute = (
            <div>
                <Switch>
                    <Route exact path="/Admin" render={(props) => <Dash {...props} />} />
                    <Route exact path="/Admin/Features" render={(props) => <Features {...props} />} />
                    <Route exact path="/Admin/Roles" render={(props) => <Roles {...props} />} />
                    <Route exact path="/Admin/Regions" render={(props) => <Regions {...props} />} />
                    <Route exact path="/Admin/Users" render={(props) => <Users {...props} />} />
                    <Route exact path="/Admin/Stores" render={(props) => <Stores {...props} />} />
                    <Route exact path="/Admin/Permissions" render={(props) => <Permissions {...props} />} />
                    <Route exact path="/Admin/ProductCatalog" render={(props) => <ProductCatalog {...props} />} />
                    <Route exact path="/Admin/SingleProduct/:id" render={(props) => <SingleProduct {...props} />} />
                    <Route exact path="/" render={(props) => <Login {...props} />} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="*" component={NotFound} />
                </Switch>
            </div>
        );
        // const getBaseName = () => {
        //     if(isAuthenticated) {
        //         if(userRole === 'Admin') {
        //             return '/Admin';
        //         }
        //     }
        // }
        return(
            <div className="App">
                <Router>
                    { (userRole === 'admin' && isAuthenticated === true) ? AdminRoute : DefaultRoute }
                </Router>
            </div>
        )
    }
}

Routes.propTypes = {
    sessionData: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired,
    userRole: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    sessionData: state.session.userSession,
    isAuthenticated: state.session,
    userRole: state.session
});

export default connect(mapStateToProps, { getSession })(Routes);