import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SearchBox.css';

class SearchBox extends Component{
    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this)
    }
    state = {
        where: "",
        search: "",
    };

    handleWhere = (e)=>{
        this.setState({where: e.target.value})
    }

    handleSearch = (e)=>{
        this.setState({search: e.target.value})
    }

    routeChange() {
        let path = `/tool/find`;
        this.props.history.push(path);
    }

    render(){
        return(
            <div className="home-search-box col s9">
                <h1>Help neighbors. Mooch a little. Get your projects done.
                    <button className="btn-large waves-effect waves-light grey accent-1 button" onClick={this.routeChange}>Let's Go!</button>
                </h1>
            </div>
        )
    }
}

export default withRouter(SearchBox);