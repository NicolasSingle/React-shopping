import React, { Component } from 'react'
import './index.scss'
import logo from 'img/logo.png'
class Login extends Component {
    render() {
        return(
            <div className='login warp'>
                <div className='logo'>
                    <img src={logo}  alt=''/>
                </div>
                <div className='center'>
                    <p>SIGN IN</p>
                    <p>OR SIGN UP IF YOU’RE <br/>NOT A MEMBER</p>
                </div>
                <div className='footer'>
                     <div className='sign'>
                        <span className='sign-title' onClick={this.signIn}>SIGN IN</span>
                        <span className='line'></span>
                        <span className='sign-title' onClick={this.signUp}>SIGN UP</span>
                     </div>
                     <p>CONNECT WITH GOOGLE</p>
                </div>
            </div>
        )
    }

    signIn = () => {
        this.props.history.push('/login/signIn');
    }

    signUp = () => {
        this.props.history.push('/login/register');
    }
}

export default Login
