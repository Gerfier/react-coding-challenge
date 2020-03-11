import React from 'react'
import PropTypes from 'prop-types'
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

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  })),
  msgCustomize: PropTypes.shape({
    columnTitle: PropTypes.string.isRequired,
    msgStyle: PropTypes.shape({
      backgroundColor: PropTypes.string.isRequired
    })
  }) 
}
export default MessageList
