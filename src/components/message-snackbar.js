import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Card, Snackbar, Box, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    msg: { 
           backgroundColor: props => props.backgroundColor,
           minWidth: 275,
        },
    text: {
           paddingTop: 2,
           paddingLeft: 5,            
    }    
})

const MessageSnackBar = ({messages, errorMsg, customize}) => {     
    const classes = useStyles(customize.msgStyle);
    const [open, setOpen] = useState(false);

    //Will handle display snackbar based on a boolean flag
    const handleDisplay = (display) => {        
        setOpen(display)       
    }; 
   
    useEffect(() => {
           handleDisplay(!! messages.length && errorMsg) 
    },[messages, errorMsg])


    return(
        <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            open={open}
            autoHideDuration={2000} 
            id="error-snackbar"
            onClose={() => {handleDisplay(false)}}                
         >
         <Card className={`${classes.msg}`} elevation={4}>
           <Box p={1}>
                <Grid container direction="row">
                    <Grid item>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => {handleDisplay(false)}}>
                            <CloseIcon fontSize="small" />
                    </IconButton>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle2" className={`${classes.text}`}>
                        {messages.length ? messages[messages.length - 1].message : ''}
                    </Typography> 
                    </Grid>
                </Grid>
            </Box>        
         </Card>                 
        </Snackbar>
           )
}

MessageSnackBar.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
    })),
    errorMsg: PropTypes.bool
}


export default MessageSnackBar