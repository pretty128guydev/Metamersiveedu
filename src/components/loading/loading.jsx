import React from 'react'
import '../../scss/app/_app-loading.scss';

function Loading(props) {
  return (
    <div className={'app-loading' + (props.className ? props.className : '')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 24 24"
        style={{ fill: 'rgba(255,255,255,0.2)' }}
      >
        <rect className="spinner_zWVm" x="1" y="1" width="7.33" height="7.33" />
        <rect
          className="spinner_gfyD"
          x="8.33"
          y="1"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_T5JJ"
          x="1"
          y="8.33"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_E3Wz"
          x="15.66"
          y="1"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_g2vs"
          x="8.33"
          y="8.33"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_ctYB"
          x="1"
          y="15.66"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_BDNj"
          x="15.66"
          y="8.33"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_rCw3"
          x="8.33"
          y="15.66"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_Rszm"
          x="15.66"
          y="15.66"
          width="7.33"
          height="7.33"
        />
      </svg>
    </div>
  )
}

export default Loading
