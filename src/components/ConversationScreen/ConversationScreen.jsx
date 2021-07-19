import React from 'react'
import Message from '../Message/Message';

const ConversationScreen = ({messages, user}) => {

    return (
        <div className="chatbox">
            {
                messages.sort((a,b) => b.createdAt.localeCompare(a.createdAt))
                .map((message) => (
                    <Message message={message} key={message.id} isMe={user.username === message.owner} />
                ))
            }
        </div>
    )
}

export default ConversationScreen;