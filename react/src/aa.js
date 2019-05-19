// import React from 'react'
// import { Route, Redirect } from 'react-router-dom'
// export default ({ component: Component, ...rest }) => {
//     return (
//         <Route {...rest} render={props => {
//             return localStorage.getItem('token') ? (<Component {...props} />) : <Redirect to={{ pathname: "/login/index", state: { from: props.location } }} />
//         }}
//         />
//     );
// }


import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        
        return (
            <Route {...rest} render={props => {
                return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }}
            />
        );
    }
}


export default PrivateRoute
