import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component{

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

    render(){
        return(
            <div className="home-search-box col m4">
                <h1>Help others, mooch a little, get projects done.</h1>
                
                <div className="form">
                    <div className="col m12">
                        <div className="input-field" id="where">
                            <input onChange={this.handleWhere} placeholder="Your Location" value={this.state.where} type="text" className="validate" />
                        </div>
                    </div>
                    <div className="col m12">
                        <div className="input-field" id="tool">
                            <input onChange={this.handleSearch}  value={this.state.search} type="text" className="validate" />
                            <label htmlFor="search">Search</label>
                        </div>
                    </div>
                    <div className="col m12 submit-btn">
                        <div className="input-field" id="submit-btn">
                            <input className="btn-large waves-effect waves-light red accent-2" type="submit" />
                        </div>
                    </div>
                </div>


            </div>            
        )
    }
}

export default SearchBox;