import React from 'react'
import Style from './Loader.module.scss'
export const Loader = () => {
  return (
    <div className={`${Style['loader-container']}`}>
        <div className={`${Style['loader']}`}></div>
        {/* <p>Loading data...</p> */}
    </div>

  )
}