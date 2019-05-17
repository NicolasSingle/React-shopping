import React, { Component } from 'react'
import './public.scss'

export default class NvHeader extends Component {
    render() {
        return (
            <div className='nav-header'>
                {
                    this.props.icon ?
                        <div className='icon' onClick={this.props.goBack}>
                            <i className="fa fa-chevron-left"></i>
                        </div> : ''
                }
                <div className='nav-title' style={{ marginLeft: !this.props.icon ? '' : '-10.667vw' }}>{this.props.title || 'SIGN IN'}</div>
            </div>
        )
    }


}