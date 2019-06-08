import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import caitiao from 'img/caitiao.jpg'

class Address extends Component {
    render() {
        const props = this.props
        return (
            <div className='address-warp' onClick={this.goAddress}>
                {
                    !props.address._id ?
                        (<div className="address addnull" >
                            点击添加收获地址
                            </div>) :
                        (<div className="address" >
                            <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                            <div className="address-cont">
                                <p className="name">收货人: {props.address.name} <span>{props.address.tel}</span></p>
                                <p className="address-e">收货地址: {props.address.area + props.address.addressDetail}</p>
                                <p className="no">(收货不便时,可选择免费待收货服务)</p>
                            </div>
                            <div className="icon2"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                        </div>)
                }
                <img src={caitiao} width="100%" height="3px" alt="" className="caitiao" />
            </div>
        );
    }

    goAddress = () => {
        this.props.history.push('/addressList')
    }
}

Address.defaultProps = {
    address: {}
};

export default withRouter(Address)