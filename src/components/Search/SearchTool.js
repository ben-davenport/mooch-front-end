import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Map from './Map';
import searchAction from '../../actions/searchAction';
import { isTSAnyKeyword } from '@babel/types';

class SearchTool extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allResults: [],
            searchTerm: "",
        } 
    }

    // async componentDidMount(){
    //     if (!this.props.auth.token) {
    //         localStorage.setItem('preLoginPage', '/tool/find')
    //         this.props.history.push('/login')
    //     }
    //     var elems = document.querySelectorAll('select');
    //     var instances = window.M.FormSelect.init(elems);

    // }
    componentDidUpdate(){
    }

    handleSearch = (e) => {
            this.setState( {
                searchTerm: e.target.value
            })
        }
    handleSubmit= (e) =>{
            e.preventDefault();
            // const searchData = {...this.state.searchTerm}
            const searchTools = axios.get(`${window.apiHost}/tools?q=${this.state.searchTerm}`);
            const formData = {...this.state.searchTerm}
            const formArr = Object.values(formData);
            const newStr = formArr.join('');
            this.props.search(newStr)
            searchTools.then((resp)=>{
                const results = resp.data.results;
                // console.log(`-----------`)
                // console.log(resp.data)
                // const newLocation = results.map((location)=>{
                //     // console.log(`${location.street} ${location.city}, ${location.state}`)
                //     return `${location.street} ${location.city}, ${location.state}`
                // })
                // const locationData = {...this.state}
                // this.props.location(locationData);
                // console.log(this.props.location)
                // const geoUrl = `https://api.mapbox.com`;
                // geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN"
                // console.log(newLocation)
                this.setState({
                    allResults : results,
                })
        })
        }

    render(){
        const results = this.state.allResults.map((result, key)=>{
            return  <div>
                <Map />
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src={`${window.apiHost}/${result.imageUrl}`} key={result.id}/>
                        </div>
                    <div className="card-stacked">
                            <div className="card-content">
                                <h5 key={key}>{result.title}</h5>
                                <h7 key={key}>{result.city}, {result.state}</h7>
                                <p key={key}>Availability: {result.availability}</p>
                                <p>{result.details}</p>
                            </div>
                            <div className="card-action">
                                <a href="#">Message {result.first}</a>
                            </div>
                        </div>
                    </div>
                    </div>
                    })
        const toolPath = `${window.apiHost}`
        // console.log(toolPath)
        // console.log(this.props.searches)
        return(       
        <div style={{marginTop: "100px"}}>
            {/* <Map /> */}
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.search} onChange={this.handleSearch}/>
            <button type="submit">Search</button>
            </form>
            <div className="col s12 m4">
                <h2>Tool Results</h2>
            </div>
                {results}
        </div>)
    }
}

function mapStateToProps(state) {
    return( {
        auth: state.auth,
        searches: state.queries.results,
    })
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {
        search: searchAction,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTool);