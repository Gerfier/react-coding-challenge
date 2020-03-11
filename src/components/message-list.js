import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Message from './message'


const MessageList = ({messages, msgCustomize , handleMessage}) => { 
 return <div>
          <Typography variant="subtitle2">{msgCustomize.columnTitle}</Typography>
          <Typography variant="body2">Count {messages.length}</Typography>
          <Grid container direction="column" spacing={2}>
            {messages.map((data, idx) => (        
              <Grid item key={idx}>
              <Message 
                data={data}
                handleMessage={handleMessage}
                msgClass={msgCustomize.msgStyle}/>
              </Grid>         
            ))
            }
          </Grid>
        </div>
}
export default MessageList
