import React from 'react'
//import PropTypes from 'prop-types'
import { Button, Card, Box, Grid, Typography, makeStyles, withStyles } from '@material-ui/core'


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
        handleMessage(data)
    }
    
    const styleClass = useStyles(msgClass)
    return(
            <Card elevation={4} className={`${styleClass.msg}`}>
               <Box p={1}>                       
                   <Grid container justify="space-between">
                        <Typography variant="body2">{data.message}</Typography>                   
                        <StyledButton                         
                        variant="contained" 
                        onClick={handleClick}
                        disableElevation>Clear</StyledButton>
                   </Grid>
               </Box>
            </Card>
           )
}


export default Message