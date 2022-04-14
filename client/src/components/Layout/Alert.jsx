import React from 'react'

const Alert = ({ alertMsg, alertType, removeAlert }) => {
  return (
    <div>
        <h2>Oh no!!!</h2>
        <h3>{alertMsg}</h3>
        <h3>{alertType}</h3>
        <div>
            <button onClick={removeAlert}>X</button>
        </div>
    </div>
  )
}

export default Alert