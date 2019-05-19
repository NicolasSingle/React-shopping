import { Toast, Icon } from 'zarm';
import React from 'react'
export const toast = (title,type='wrong-round') => {
    Toast.show(
        (<div className="box">
            <Icon className="box-icon error-icon" type={type} />
            <div className="box-text">
                {title}
          </div>
        </div>),1500
    )
}