import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './LendTool.css';
import axios from 'axios';
// import hostHomeAction from '../../actions/hostHomeAction';

class LendTool extends Component{
    state = {
        title: '',
        details: '',
        category: '',
        availability: '',
        image: '',
    }
    changeTitle = (e) => {
        this.setState( {
            title: e.target.value
        })
    }
    // changeLocation = (e) => {
    //     this.setState( {
    //         location: e.target.value
    //     })
    // }
    changeAvailability = (e) => {
        this.setState( {
            availability: e.target.value
        })
    }
    // changePricePerNight = (e) => {
    //     this.setState( {
    //         pricePerNight: e.target.value
    //     })
    // }
    changeDetails = (e) => {
        this.setState( {
            details: e.target.value
        })
    }
    changeImage = (e) => {
        this.setState( {
            image: e.target.value
        })
    }
    changeCategory = (e) => {
        this.setState( {
            category: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.props.auth)

        const file = document.getElementById('location-image').files[0];
        const headerConfig = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const data = new FormData();
        data.append('locationImage',file);
        for(let key in this.state){
            data.append(key,this.state[key])
        }
        const submitHostUrl = `${window.apiHost}/tool/addTool`
        // let dataToSend = {...this.state}
        data.append('token',this.props.auth.token);
        const axiosResponse = await axios.post(submitHostUrl,data,headerConfig);
        console.log(axiosResponse.data)
    }
    componentDidMount(){
        if (!this.props.auth.token) {
            localStorage.setItem('preLoginPage', '/tool/newTool')
            this.props.history.push('/login')
        }
        var elems = document.querySelectorAll('select');
        // eslint-disable-next-line no-unused-vars
        var instances = window.M.FormSelect.init(elems);
    }
    render(){
        console.log(this.props)
        return(
            <div className="row host-home">
                <form onSubmit={this.onSubmit} className="col s8 offset-s2">
                    <div className="row">
                        <div className="input-field col s6">
                            <input value={this.state.title} onChange={this.changeTitle} id="title" type="text" className="validate" />
                            <label htmlFor="title">Title</label>
                        </div>
                        {/* <div className="input-field col s6">
                            <input value={this.state.location} onChange={this.changeLocation} id="location" type="text" className="validate" />
                            <label htmlFor="location">Location</label>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <select value={this.state.availability} onChange={this.changeAvailability} >
                                <option value="" disabled>Choose your option</option>
                                <option value="Weekdays Only">Weekdays Only</option>
                                <option value="Weekends Only">Weekends Only</option>
                                <option value="Every Day">Every Day</option>
                                <option value="By Request">By Request Only</option>
                            </select>
                            <label>Days Available</label>
                        </div>                    
                        {/* <div className="input-field col s6">
                            <label htmlFor="price">Price/night</label>
                            <input value={this.state.price} onChange={this.changePricePerNight} type='number' id="price" className="validate" />
                        </div> */}
                    </div>
                <div className="row">
                    <div className="col s12">
                        <textarea value={this.state.details} onChange={this.changeDetails} id="details" className="materialize-textarea"></textarea>
                        <label htmlFor="details">Details (be descriptive!)</label>
                    </div>
            </div>
            <div className="row">
                    <div className="input-field col s6">                            
                        <input required id="location-image" onChange={this.changeImage} type="file" />Upload image
                    </div>
                    <div className="input-field col s6">
                        {/* <input value={this.state.category} onChange={this.changeCategory} id="category" type="text" className="validate" /> */}
                        <div className="input-field col s6">
                            <select value={this.state.category} onChange={this.changeCategory} >
                                <option value="" disabled>Choose Relevant Category</option>
                                <option value="construction">Construction Tools</option>
                                <option value="gardening">Gardening Tools</option>
                                <option value="housework">Housework Tools</option>
                                <option value="other">Other Tools</option>
                            </select>
                            <label>Categories</label>
                        </div>    
                        <label htmlFor="category"></label>
                    </div>
                </div>
                <button className='submit-button'>Submit</button>
            </form>
        </div>
                                        
        )
    }
}
function mapStateToProps(state) {
    return( {
        auth: state.auth,
    })
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {
        // hostHomeAction: hostHomeAction
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LendTool);
