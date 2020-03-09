import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Message from './message'

const MessageList = ({ stream, handleMessage}) => (
  <div>
    <Typography variant="subtitle2">{stream.length ? stream[0].msgType : 'Message Type #'}</Typography>
    <Typography variant="body2">Count {stream.length}</Typography>
    <Grid container direction="column" spacing={2}>
      {stream.map((data, idx) => (        
        <Grid item key={idx}>
         <Message 
          data={data} 
          handleMessage={handleMessage}
          msgClass={data.msgStyle}/>
        </Grid>         
      ))
      }
    </Grid>
  </div>
)
export default MessageList
