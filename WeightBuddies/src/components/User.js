import React, { Component } from 'react';
import NavBar from "./SimpleTabs";

class User extends Component {
    render() {
        return(
            <div>
                <NavBar />
                <h1>User page</h1>
            </div>
        )
    }
}

export default User;