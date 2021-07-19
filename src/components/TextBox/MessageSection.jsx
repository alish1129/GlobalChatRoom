import React, { useState } from 'react'
import {  MDBCol, MDBInput, MDBRow } from 'mdbreact';
import { API } from 'aws-amplify';
import { createMessage } from '../../graphql/mutations';

const MessageSection = ({user}) => {
    const [userText, setUserText] = useState()

    const handleMessageSend = async (event) => {
        event.preventDefault();
        if (userText.length !== 0) {
            const input = {
                message: userText,
                owner: user.username
            };
    
            await API.graphql({
                authMode: "AMAZON_COGNITE_USER_POOLS",
                query: createMessage,
                variables: {
                    input: input
                },
            }).then((data) => setUserText(""))
        } 
    }

    return (
        <div className="formContainer">
            <form onSubmit={handleMessageSend} className="formBase">
                <MDBRow>
                    <MDBCol md="10" sm="7">
                        <MDBInput
                            type="text"
                            id="message"
                            name="message"
                            autoFocus
                            required
                            value={userText}
                            onChange={(e) => setUserText(e.target.value)}
                            placeholder="💬 Send a message to the world 🌎"
                            className="textBox"
                        />
                    </MDBCol>
                    <MDBCol md="2" sm="5">
                        <button className="btn btn-primary float-right">Send</button>
                    </MDBCol>
                </MDBRow>
            </form>
      </div>
    )
}

export default MessageSection;