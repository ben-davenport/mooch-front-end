import React, { Component } from 'react';
import './Account.css';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

class Account extends Component{
    state = {
        date1: "",
        date2: "",
        datesMsg: "",
        daysDiff: 0
    }


    // <div className="col s12 m4">
    //                 {/* profile image? */}
    //             </div>
    render(){
        console.log(this.props.auth)
        return(
            <div className="row fullAbode">
                <div className="section"></div>
                <div className="section"></div>
                <div className="col s8 location-details offset-s2">
                    <div className="col s8 left-details">
                        <h1>{this.props.auth.first} {this.props.auth.last}</h1> 
                        <h6># of Rentals</h6>   
                    </div>
                    <div className="col s4 right-details">
                        <img src={""}/>
                    </div>
                </div>
                <div className="col s8 offset-s2">
                    <h2>About Me</h2>
                    <h4>{this.props.auth.about}</h4>
                    <h2>Contact Me</h2>
                    <h4>{this.props.auth.email}</h4>
                </div>
                    <div>
                        <span>Tools Available</span>
                        <ul>
                            <li>Tool 1</li>
                            <li>Tool 2</li>
                        </ul>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Account);