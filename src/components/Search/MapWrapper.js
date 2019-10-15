import React from 'react';
import Map from './Map'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

class MapWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            coordinates: [],
        }
    }
    async shouldComponentUpdate(nextProps, nextState){
        // console.log(this.props)
        //     const locations = this.props.searches.map(location => {
        //         // const geocode = axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${TOKEN}`,)
        //         try {
        //             const geocode = axios.get(`${geocodeUrl}`)
        //             console.log('************')
        //             console.log(geocode)
        //             console.log(geocode.features)
        //             //longitude then latitude at 
        //             return geocode
        //         }
        //         catch(error){
        //             console.log(error)
        //             return 
        //                 const userLocation = `${this.props.auth.location}`;
        //         }
        //         }); 
            return true; 
    }

    render(){
        
        return(
            <Map />  
        )
    }
    
}

function mapStateToProps(state) {
    return( {
        searches: state.queries,
    })
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {

    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);