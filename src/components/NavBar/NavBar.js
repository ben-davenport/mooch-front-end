import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import ModalSplash from './ModalSplash';
import Login from './Login';
import Signup from './Signup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logoutAction from '../../actions/logoutAction'
import testThunkAction from '../../actions/thunkTest';

class NavBar extends Component{

    state = {
        showModal: false,
        modalContent: ""
    }

    componentDidMount(){
        this.props.aThunk();
        this.setState({
            modalContent: <ModalSplash changeModalContent={this.changeModalContent}/>            
        })
    }

    changeModalContent = (newContent)=>{
        let modalContent = <ModalSplash changeModalContent={this.changeModalContent}/>
        if(newContent === 'login'){
            modalContent = <Login  changeModalContent={this.changeModalContent} closeModal={this.closeModal}/>
        }else if(newContent === 'signup'){
            modalContent = <Signup  changeModalContent={this.changeModalContent} closeModal={this.closeModal} />
        }
        this.setState({
            modalContent
        })
    }

    signup = (e)=>{
        document.querySelector('body').className = 'body-modal-show';
        this.setState({
            showModal: true,
        })
    }
    closeModal = (e)=>{
        document.querySelector('body').className = '';
        this.setState({
            showModal: false
        })
    }

    buildNavLinks = ()=>{
        let navLinks = "";
        if(!this.props.auth.token){
            // user is not logged in. Give them standard nav
            navLinks = 
            <ul id="nav-mobile" className="right">
                <li><Link to="/tool/newTool">Lend a Tool</Link></li>
                <li><Link to="/tool/find">Find a Tool</Link></li>
                <li><Link to="/help">Help</Link></li>
                <li className="nav-non-link" onClick={this.signup}>
                    Sign up
                </li>
                <li className="nav-non-link" onClick={this.signup}>
                    Log in
                </li>
            </ul>
        }else{
            //user is logged, give them logged in nav
            navLinks = 
                <ul id="nav-mobile" className="right">
                    <li><Link to="/tool/newTool">Lend a Tool</Link></li>
                    <li><Link to="/tool/find">Find a Tool</Link></li>
                    <li onClick={this.props.logout}>Logout</li>
                    <li><Link to="/account">Welcome, {this.props.auth.first}</Link></li>
                </ul>
        }
    return navLinks
    }

    render(){
        let navColor = "grey darken-3";
        if(this.props.location.pathname !== '/'){
            navColor = "black";
        }
        console.log(this.props);
        const navLinks = this.buildNavLinks();
        return(
            <div className="container-fluid nav">
                <div className="row">
                    <nav className={navColor}>
                        <div className="nav-wrapper">
                            <Link to="/" className="left">Mooch</Link>
                            {navLinks}

                        </div>
                    </nav>
                </div>

                <div className="login-modal" style={this.state.showModal ? {"display": "block"} : {}} >
                    <button id="close-modal" onClick={this.closeModal}>&Chi;</button>
                    <div className="modal-content">
                        {this.state.modalContent}
                    </div>
                </div>
            </div>

        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        logout: logoutAction,
        aThunk: testThunkAction,
    },dispatch)
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

// export default NavBar;
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
