import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signUpAction from '../../actions/signUpAction';
import './Signup.css'

class SignUp extends React.Component{

    state = {
        email: "", 
        first: "", 
        last: "",
        state: "",
        city: "",
        street: "",
        about: "",
        password: "",
        msg: ""
    }

    //this lifecycle method runs ANYTIME props or state 
    // changes for this component
    componentDidUpdate(prevProps,prevState){
        if((this.props.auth.msg === 'userExists') && (prevProps.auth.msg !== 'userExists')){
            this.setState({
                msg: "This user already exists. Please log in or create a new account."
            })
        }else if((this.props.auth.msg === 'userAdded') && (prevProps.auth.msg !== 'userAdded')){
            // user was added. close the modal.
            this.props.closeModal();
        }
    }

    changeEmail = (e)=>{this.setState({email: e.target.value})}
    changeFirst = (e)=>{this.setState({first: e.target.value})}
    changeLast = (e)=>{this.setState({last: e.target.value})}
    changeState = (e)=>{this.setState({state: e.target.value})}
    changeCity = (e)=>{this.setState({city: e.target.value})}
    changeStreet = (e)=>{this.setState({street: e.target.value})}
    changePass = (e)=>{this.setState({password: e.target.value})}
    changeAbout = (e)=>{this.setState({about: e.target.value})}

    submitSignUp = (e)=>{
        e.preventDefault();
        // assume the data is valid. 
        // if we run into invalid data, switch to false
        let formValid = true; 
        let msg = "";
        for(let key in this.state){
            if((this.state[key].length < 1) && (key !== 'msg')){
                formValid = false;
                msg = `${key} field is required`
                break;
            }
        }

        // if(this.state.password.toLowerCase() === this.state.password){
        //     // user doesnt have any uppercase characters
        //     formValid = false;
        //     msg = "Your password must contain at least 1 uppercase letter";
        // // check to see if there is a number in the password
        // }else if(!(/\d/.test(this.state.password))){
        //     formValid = false;
        //     msg = "Your password must contain at least 1 number."
        // }

        if(formValid){
            const userData = {...this.state}
            // const userData = Object.assign({},this.state)
            this.props.signUpAction(userData);    
        }else{
            this.setState({
                msg
            })
        }
    }

    render(){
        console.log(this.props.auth);
        return(
            <div className="register-form">
                <p className="form-msg">{this.state.msg}</p>
                <form onSubmit={this.submitSignUp}>
                    <input required onChange={this.changeEmail} value={this.state.email} className="email-signup" placeholder="Email address" />
                    <input required onChange={this.changeFirst} value={this.state.first}  className="first-signup" placeholder="First name" />
                    <input required onChange={this.changeLast} value={this.state.last}  className="last-signup" placeholder="Last name" />
                    <input required onChange={this.changeState} vale={this.state.state} className="first-signup" placeholder="State"/>
                    <input required onChange={this.changeCity} vale={this.state.city} className="last-signup" placeholder="City"/>
                    <input required onChange={this.changeStreet} vale={this.state.street} className="first-signup" placeholder="Street"/>
                    <input onChange={this.changeAbout} value={this.state.about} className="first-signup" placeholder="About"/>
                    <input required type="password" onChange={this.changePass} value={this.state.password} className="password-signup" placeholder="Password" />
                    <button className="sign-up-button">Sign up</button>
                    <div className="border-rule"></div>
                    <div className="login-text align-left">Already have a Mooch account? <span onClick={()=>{this.props.changeModalContent('login')}}>Log in</span></div>
                </form>
            </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        signUpAction
    },dispatch)
}

// export default SignUp;
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);