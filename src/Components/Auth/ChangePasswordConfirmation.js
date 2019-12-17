import React, { Component } from 'react'

export default class ChangePasswordConfirmation extends Component {
    render() {
        return(
            <div>
                <h1>Change Password</h1>
                <p>Your password has been successfully updated!</p>
                <a href="/Login" className="btn btn-success">Login Page</a>
            </div>
        )
    }
}