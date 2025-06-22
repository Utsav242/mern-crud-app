import React from 'react'
import { FadeLoader } from 'react-spinners';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
        <FadeLoader />
    </div>
  )
}

export default Spinner