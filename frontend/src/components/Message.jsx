import './Message.css'

import React from 'react'

const Message = ({ msg, type }) => {
    return (
        <div className={`message ${type}`}>
            <p>{msg}</p>
        </div>
    )
}

export default Message