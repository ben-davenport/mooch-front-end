import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


// const useStyles = makeStyles(theme => ({
//     root: {
//         margin: '50px',
//         padding: theme.spacing(3,2),
//     },
//     flex: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     topicsWindow:{
//         width: '30%',
//         height: '300px',
//         borderRight: '1px solid grey',
//     },
//     chatWindow:{
//         width: '70%',
//         height: '300px',
//         padding: '20px',
//     },
//     chatBox:{
//         width: '85%'
//     },
//     button:{
//         width: '15%'
//     },
// }));
const styles = {root: {
    margin: '50px',
    padding: '10px',
},
flex: {
    display: 'flex',
    alignItems: 'center',
},
topicsWindow:{
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey',
},
chatWindow:{
    width: '70%',
    height: '300px',
    padding: '20px',
},
chatBox:{
    width: '85%'
},
button:{
    width: '15%'
},}
class Messages extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            textValue: "",
        }
    }

    // classes = useStyles();

    changeText = (e) => {
        this.setState({
            textValue: e.target.value
        })}

    render(){
        return(
        <div>
            <Paper style={styles.root}>
                <Typography variant="h4" component="h4">
                    Chat App
                </Typography>
                <Typography variant="h5" component="h5">
                    Topic Placeholder
                </Typography>
                <div style={styles.flex}>
                    <div style={styles.topicsWindow}>
                        <List>
                            {
                                ['topic'].map(topic =>{
                                    return(
                                    <ListItem key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>)
                                })
                            }
                        </List>
                    </div>
                </div>
                <div style={styles.flex}>
                    <div style={styles.chatWindow}>
                            {
                                [{from: 'user', msg: 'hello'}].map((chat, i) =>{
                                    return(
                                    <div style={styles.flex}>
                                        <Chip label={chat.from} style={styles.chip} />
                                        <Typography variant='p'>chat.msg</Typography>
                                </div>)                                    
                                })
                            }
                    </div>
                </div>
                <div style={styles.flex}>
                        <TextField
                            label="Send a Chat"
                            style={styles.chatBox}
                            value={this.state.textValue}
                            onChange={this.changeText}
                            // margin="normal"
                        />
                    <Button variant="contained" color="primary">
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
        )
    }

}
export default Messages;