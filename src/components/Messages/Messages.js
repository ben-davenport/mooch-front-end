import React from 'react';
class Messages extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allMessages : [],
            msg: "",
        }
    }

    componentDidMount(){
        this.socketToMe();
        
    }

    socketToMe = () => {
        const url = 'ws://localhost:6010/ws';
        this.connection = new WebSocket(url);
        this.connection.onopen = () => {
            console.log("a socket was established");
            this.setState({socketOn : true})
            }    
        this.connection.onmessage = ({data}) => {
            console.log(" ");
            console.log("The backend sent a socket connention... was it supposed to?");
            console.log(" ");
            console.log(data)
            const dataJson = (JSON.parse(data));
            console.log(dataJson);
            this.setState({
                allMessages : [...this.state.allMessages, dataJson.msg]
            })
            }
            
            this.connection.onerror = (err) => console.log(`Websocket errored: ${err.message}`);
            this.connection.onclose = () => {
                this.setState({socketOn: false},
                    () => {
                    console.log(" ");
                    console.log(" ");
                    console.log(`Lost the websocket!`);
                    console.log(" ");
                    console.log(" ");
                    console.log("trying again...");
                    setTimeout(this.socketToMe, 300);
                    })
            };
        }
        handleChangeMsg = (e) => {
            this.setState( {
                msg: e.target.value
            })
        }
        handleSubmit= (e) =>{
            e.preventDefault();
            this.connection.send(JSON.stringify({msg:this.state.msg}))
        }

    render(){
        const messages = this.state.allMessages.map((msg, key)=>{
            return <li key={key}>{msg}</li>
        })
        return(
        <div style={{marginTop: "100px"}}>

            <form onSubmit={this.handleSubmit}>
                <input value={this.state.msg} onChange={this.handleChangeMsg}/>
                <button type="submit">Send</button>
            </form>
            <ul>{messages}</ul>
        </div>)
    }
}
export default Messages;