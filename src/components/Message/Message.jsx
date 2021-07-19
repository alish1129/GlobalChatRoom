import React from 'react';

const Message = ({message, isMe}) => {
    return (
        <div
            className={
                isMe ? "sentMessageContainer" : "receivedMessageContainer"
            }
            >
            <p className="senderText">{message.owner}</p>
            <div className={isMe ? "sentMessage" : "receivedMessage"}>
                <p>{message.message}</p>
            </div>
        </div>
    )
}

export default Message;