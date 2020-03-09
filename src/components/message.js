import React from 'react'
//import PropTypes from 'prop-types'
import { Button, Paper, Box, Grid, Typography, makeStyles, withStyles } from '@material-ui/core'


const useStyles = makeStyles({
    msg: { backgroundColor: props => props.backgroundColor }
})

const StyledButton = withStyles({
  root: {
    background: 'inherit',
    textTransform: 'none',
    "&:hover": {
        backgroundColor: 'white'
      }
  }
})(Button);

const Message = ({data, handleMessage, msgClass}) => { 

    const handleClick = () => {  
        handleMessage(data.stream)
    }
    
    const styleClass = useStyles(msgClass)
    return(
            <Paper elevation={4} className={`${styleClass.msg}`}>
               <Box p={1}>                       
                   <Grid container justify="space-between">
                       <Typography variant="body2">Notification</Typography>                   
                        <StyledButton                         
                        variant="contained" 
                        onClick={handleClick}
                        disableElevation>Clear</StyledButton>
                   </Grid>
               </Box>
            </Paper>
           )
}


export default Message