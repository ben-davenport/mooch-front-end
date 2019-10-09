import React from 'react';
import { Link } from 'react-router-dom';

function ModalSplash(props){
    return(
        <div>
            <span>-</span>
            <button onClick={()=>{props.changeModalContent('signup')}} className="center email-login">Sign up with email</button>
            <div className="border-rule"></div>
            <div onClick={()=>{props.changeModalContent('login')}} className="login-text align-left">Already have a Mooch account? <Link to="">Log in</Link></div>        
        </div>
    )
}

export default ModalSplash;