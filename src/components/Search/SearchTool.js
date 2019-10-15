import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Map from './Map';
import searchAction from '../../actions/searchAction';
import './SearchTools.css';

// const useStyles = makeStyles({
//     card: {
//         maxWidth: 345,
//     },
//     });

class SearchTool extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allResults: [],
            searchTerm: "",
            msg: "",
            geocodeResults: [],
        } 
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.searches.msg !== prevProps.searches.msg){
            let message = ""
            if(this.props.searches.msg === "noResults"){
                message = "Try Again"}
            else{
                message = "Search Results:"
            }
            this.setState({
                msg: message
            })
        }
        else{}
    }

    // async componentDidMount(){
    //     if (!this.props.auth.token) {
    //         localStorage.setItem('preLoginPage', '/tool/find')
    //         this.props.history.push('/login')
    //     }
    //     var elems = document.querySelectorAll('select');
    //     var instances = window.M.FormSelect.init(elems);

    // }


    handleSearch = (e) => {
            this.setState( {
                searchTerm: e.target.value
            })
        }
    handleSubmit= async (e) =>{
            e.preventDefault();            
            const {data: {results}} = await axios.get(`${window.apiHost}/tools?q=${encodeURI(this.state.searchTerm)}`);
            console.log(results)    
            const geocodeResults = await Promise.all(results.map(this.geocodeThis))
            console.log(geocodeResults)
            this.setState({
                geocodeResults,
                allResults: results,
            })
        }
    geocodeThis = async (location)=>{
        const TOKEN = `pk.eyJ1IjoiYm1hbjUyOTMiLCJhIjoiY2sxcWd5YWkwMTduazNibWlpajlxYTF6MyJ9.gnqQR4Esnf2RUkkB-zXZzQ`;
        const fullAddress =`${location.street} ${location.city} ${location.state}`;
        const uriAddress = encodeURI(fullAddress)
        const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${uriAddress}.json?access_token=${TOKEN}`
        const {data: {features: [{center}]}} = await axios.get(geocodeUrl);
        return {
            latitude: center[1],
            longitude: center[0],
        }
    }

    render(){
        if(this.state.allResults && this.state.allResults.length > 0){
            const results = this.state.allResults.map((result, key)=>{
                if(this.props.searches.msg !== "noResults"){
                    return <div className="card waves-effect waves-block waves-light">
                                <div className="card-image">
                                    <img class="activator" src={`${window.apiHost}/${result.imageUrl}`} key={result.id}/>
                                </div>
                                    <div className="card-content">
                                    <span class="card-title activator grey-text text-darken-4">{result.title}<i class="material-icons right"></i></span>
                                        {/* <h5 key={key}>{result.title}</h5> */}
                                        <p key={key}>{result.city}, {result.state}</p>
                                        <p key={key}>Availability: {result.availability}</p>
                                    </div>
                                    <div class="card-reveal">
                                        <span class="card-title grey-text text-darken-4">{result.title}<i class="material-icons right">close</i></span>
                                        <p>{result.details}</p>
                                    </div>
    
                            </div>   
                    }
                })
        return(
            <div style={{marginTop: "100px"}}>
                <form className="searchBar" onSubmit={this.handleSubmit}>
                    <input value={this.state.search} onChange={this.handleSearch}/>
                <button type="submit">Search</button>
                </form>
                <div className="col s12 m4 page">
                    <div className="resultsPage">
                        <div classsName="title">
                            <h2>{(this.state.msg)}</h2>
                        </div>
                        <div className="pageBody">
                        {results}
                        </div>
                    </div>
                    <div className="mapPage">
                        <Map locations={this.state.geocodeResults} />
                    </div>
                </div>
            </div>)
        }
    else{
        if(this.props.searches.msg === "noResults"){
        return (
            <div style={{marginTop: "100px"}}>
                <form className="searchBar" onSubmit={this.handleSubmit}>
                <input value={this.state.search} onChange={this.handleSearch}/>
                <button type="submit">Search</button>
                </form>
            <div className="col s12 m4">
                <h2>{(this.state.msg)}</h2>
            </div>
            No Results Found for "{this.state.searchTerm}"
            </div>)
        }
        else{
            return (
                <div style={{marginTop: "100px"}}>
                    <form className="searchBar" onSubmit={this.handleSubmit}>
                    <input value={this.state.search} onChange={this.handleSearch}/>
                    <button type="submit">Search</button>
                    </form>
                </div>

            )
        }

    }
}
}
function mapStateToProps(state) {
    return( {
        auth: state.auth,
        searches: state.queries,
    })
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {
        search: searchAction,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchTool);