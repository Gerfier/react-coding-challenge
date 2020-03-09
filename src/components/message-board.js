import React from 'react'
import { Button, Box, Grid, styled} from '@material-ui/core'
import Api from '../api'
import MessageList from './message-list'

const StyledButton = styled(Button)({
  backgroundColor: 'aquamarine',
  color: 'black',
  height: 30,
  padding: '0 22px',
  marginRight: '5px',
  marginTop: '7px',
})

const Header = styled('div')({
  height: '40px', 
  borderBottom: '1px solid gray',
})

const Subtitle = styled('div')({
  marginLeft: '15px',
  fontWeight: 'bold',
  position: 'relative',
  top: '7px',
  fontFamily: 'Roboto',
})

class MessageBoard extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      errorMsg: null,
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    })
  }

  //Toggle button for start/stop
  handleToggle = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  handleClearAll = () => {
      this.setState({ messages: [], errorMsg: null})
  }

  handleMessage = (message) => {
      const { messages } = this.state;
      const updatedList = messages.filter( msg => msg.id !== message.id );
      this.setState({ messages: updatedList});
  }

  render() {
    const { messages, errorMsg } = this.state;
    const isApiStarted = this.api.isStarted()
    let messageList = {};

    //Generate messageList data structure to group messages data
    const msgArray = messages.map( msg => {        
          switch(msg.priority){
          case 1:
            messageList = {
              msgType: 'Error Type 1',
              msgStyle: { backgroundColor: '#F56236' }}         
            break;
          case 2: 
            messageList = {
              msgType: 'Warning Type 2',
              msgStyle: { backgroundColor: '#FCE788' }}            
            break;
          case 3: 
            messageList = {
              msgType: 'Info Type 3',
              msgStyle: { backgroundColor: '#88FCA3' }}           
            break;
          default:
            messageList = {
              msgType: 'Info Type 3',
              msgStyle: { backgroundColor: '#88FCA3' }}           
            break;
      }
      messageList.stream = msg;
      return messageList
    })    
    return (
      <div>
        <Header>
          <Subtitle>Help.com Coding Challenge</Subtitle>
        </Header>
        <Box display="flex" alignItems="center" justifyContent="center">
          <StyledButton
          variant="contained"
          onClick={this.handleToggle}
          >
            {isApiStarted ? 'STOP' : 'START'}
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={this.handleClearAll}
          >
            CLEAR
          </StyledButton>
        </Box>      
        <Box p={7}>
          <Grid container direction='row' spacing={2}>
           {[1,2,3].map((priority, idx) => {
            const data = msgArray.filter( msg => msg.stream.priority === priority);                     
            console.log('data ', data);
            return (
                  <Grid item key={idx} md={4} sm={12} xs={12}>
                    <MessageList stream={data ? data : []} 
                                 handleMessage={this.handleMessage}/>
                  </Grid>   
                )                             
             })}
          </Grid>
        </Box>
      </div>
    )
  }
}

export default MessageBoard
