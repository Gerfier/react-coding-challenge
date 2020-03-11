import React from 'react'
import { Button, Box, Container, Grid, styled} from '@material-ui/core'
import Api from '../api'
import MessageList from './message-list'
import MessageSnackBar from './message-snackbar'

/**
 * MessageBoard - parent component.
 */
const StyledButton = styled(Button)({
  backgroundColor: 'aquamarine',
  color: 'black',
  height: 30,
  padding: '0 22px',
  margin: '7px 5px 62px 0',
})

const Header = styled('div')({
  height: '65px', 
  borderBottom: '1px solid gray',
})

const Subtitle = styled('div')({
  marginLeft: '15px',
  fontWeight: 'bold',
  position: 'relative',
  top: '29px',
  fontFamily: 'Roboto',
})

class MessageBoard extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      errorMsg: false,
    }
  }


  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount = () => {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
      //if an error message comes set errorMsg to true to display snackbar
      errorMsg: message.priority === 1
    });
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
      this.setState({ messages: []})
  }

  //Handle deleting a message
  handleClearMessage = (message) => {
      const { messages } = this.state;
      const updatedList = messages.filter( msg => msg.id !== message.id );
      this.setState({ messages: updatedList});
  }

  render() {
    const { messages } = this.state;
    const isApiStarted = this.api.isStarted()

    //Group messages styling and additional data by priority
    const msgCustomize = {
      1: {
          columnTitle: 'Error Type 1',
          msgStyle: { backgroundColor: '#F56236' }
      }, 
      2: {
          columnTitle: 'Warning Type 2',
          msgStyle: { backgroundColor: '#FCE788' }
      }, 
      3: {
          columnTitle: 'Info Type 2',
          msgStyle: { backgroundColor: '#88FCA3' }
      }};
    const errors = messages.filter(error => error.priority === 1);
    return (
      <div>
        <Header>
          <Subtitle>Help.com Coding Challenge</Subtitle>
          <MessageSnackBar 
              messages={errors} 
              errorMsg={this.state.errorMsg}
              customize={msgCustomize[1]}
              />
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
        <Container maxWidth="md">
          <Grid container direction='row' spacing={2}>          
           {[1,2,3].map((priority, idx) => {
             //filtered out to display based on priority
            const data = messages.filter( msg => msg.priority === priority);                                 
            //Reverse array below to display latest message at the top
            return (
                  <Grid item key={idx} md={4} sm={12} xs={12}>                    
                    <MessageList messages={data ? data.reverse() : []}
                                 msgCustomize={msgCustomize[priority]}                                    
                                 handleMessage={this.handleClearMessage}/>
                  </Grid>   
                )                             
             })}
          </Grid>
        </Container>
      </div>
    )
  }
}

export default MessageBoard
