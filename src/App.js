import './App.css';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import config from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { ConversationScreen, Header, MessageSection } from './components'
import { MDBContainer, MDBRow, MDBCol, MDBFooter } from "mdbreact";
import { onCreateMessage } from './graphql/subscriptions';
import { listMessages } from './graphql/queries';

Amplify.configure(config);

function App() {

    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);

    useEffect(()=> {
        const getMessages = async () => {
            await API.graphql({
                query: listMessages,
                authMode: 'AMAZON_COGNITO_USER_POOLS',
            }).then(response => 
                setMessages(response.data.listMessages.items)
            ).catch(err => console.log(err))
        }
        getMessages()
    }, [user])

    useEffect(()=> {
        const getCurrentUser = async () => {
            await Auth.currentAuthenticatedUser()
                .then(data => setUser(data))
                .catch(err => setUser(null))
            }
        const subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
            next: ({provider, value}) => {
                setMessages((messages) => [
                    ...messages,
                    value.data.onCreateMessage
                ])
            }
        })
        getCurrentUser()
    }, [])

    return ( 
        <div className="app">
            <Header/>
            <MDBContainer>
                <ConversationScreen messages={messages} user={user} />  
                <MDBFooter className="footer">
                    <MessageSection user={user} />
                </MDBFooter >
            </MDBContainer>
        </div>
    );
}

export default withAuthenticator(App);
