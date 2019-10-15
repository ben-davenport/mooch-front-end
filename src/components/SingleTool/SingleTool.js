import React, { Component } from 'react';
import './SingleTool.css';
import axios from 'axios';
import { connect } from 'react-redux';

class FullAbode extends Component{
    state = {
        tool: {},
    }


    async componentDidMount(){
        const toolId = this.props.match.params.toolId;
        const url = `${window.apiHost}/tool/a/${toolId}`
        const axiosResponse = await axios.get(url)
        // console.log(axiosResponse.data);
        this.setState({
            tool: axiosResponse.data
        })
        // var elems = document.querySelectorAll('select');
        // // eslint-disable-next-line no-unused-vars
        // var instances = window.M.FormSelect.init(elems);
    }


    render(){
        const tool = this.props.searches;
    
        console.log(`SingleTool, tool: `)
        console.log(tool);
        console.log(this.props.auth)
        return(
            <div className="row fullAbode">
                <div className="col s12">
                    <img src={`${window.apiHost}${tool.imageUrl}`} />
                </div>
                <div className="col s8 location-details offset-s2">
                    <div className="col s8 left-details">
                        <div className="location">{tool.location}</div>
                        <div className="title">{tool.title}</div>
                        
                        <div className="divider"></div>
                        
                        <div className="details">{tool.details}</div>
                    </div>
                    </div>
            </div>

        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth,
        searches: state.queries,
    }
}

export default connect(mapStateToProps)(FullAbode);