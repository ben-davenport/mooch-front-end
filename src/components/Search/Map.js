import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapGL, { Marker } from 'react-map-gl';
import axios from 'axios';

// const TOKEN = 'pk.eyJ1Ijoiam9uYXRoYW5yYXkxNyIsImEiOiJjanZ3aHd1ZzM0Y3B5NDlxcjRsbnIzcTAxIn0.ygYs-iXNclW8pJeuknEvJA';
const TOKEN = `pk.eyJ1IjoiYm1hbjUyOTMiLCJhIjoiY2sxcWd5YWkwMTduazNibWlpajlxYTF6MyJ9.gnqQR4Esnf2RUkkB-zXZzQ`
class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
            latitude: 74.0060,
            longitude: 40.7128,
            zoom: 16,
            bearing: 0,
            pitch: 0,
            width: 500,
            height: 500,
            },
            };
    }
    // componentDidMount(){
    //     }
    //     this._assignMapDimensions();
    //     window.addEventListener('resize', this._assignMapDimensions);
    // }
    // componentWillUnmount(){
    //     window.removeEventListener('resize', this._assignMapDimensions);
    


    render() {
        if(this.props.searches){
            const locations = this.props.searches.map(location => {
                const fullAddress =`${location.street}%${location.city}%${location.state}.json`;
                const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${fullAddress}.json?access_token=${TOKEN}`
                // const geocode = axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${TOKEN}`,)
                try {
                    const geocode = axios.get(`${geocodeUrl}`)
                    return geocode
                }
                catch(error){
                    console.log(error)
                    return 
                        const userLocation = `${this.props.auth.location}`;
                }
                }); 
        }
        const latitude = 74.0060;
        const longitude = 40.7128;
        const {viewport} = this.state;
        return (
            <MapGL
                className='mapbox-gl'
                {...viewport}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v9"
                onViewportChange={this.onChange}
                mapboxApiAccessToken={TOKEN}>
                <Marker
                    // key={spot.objectid}
                    // latitude={parseFloat(spot.latitude)}
                    // longitude={parseFloat(spot.longitude)}
                    latitude={latitude}
                    longitude={longitude}>
                    <img src="/wifi.svg" alt="" />
                </Marker>
            {/* {arrayOfMarkers} */}
            </MapGL>
        );
    }
    onChange = (viewport) => {
        this.setState({
        viewport: {
            ...viewport,
        }
        });
    }
    // _assignMapDimensions = () => {
    // const width = document.getElementById("mapbox").offsetWidth;
    // const height = document.getElementById("mapbox").offsetHeight;
    // this.setState({
    //     viewport: {
    //     ...this.state.viewport,
    //     width,
    //     height,
    //     }
    // });
    // }
}
function mapStateToProps(state) {
    return( {
        auth: state.auth,
        searches: state.queries.results,
    })
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);
