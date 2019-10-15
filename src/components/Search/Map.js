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
            latitude: 33.7490,
            longitude: -84.3880,
            zoom: 12,
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
        const {viewport} = this.state;
        console.log(this.props.locations)
        return (
            <MapGL
                className='mapbox-gl'
                {...viewport}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v9"
                onViewportChange={this.onChange}
                mapboxApiAccessToken={TOKEN}>
                {this.props.locations.map((location)=>{
                    return <Marker
                            latitude={location.latitude}
                            longitude={location.longitude}
                            offsetTop={-12}>
                            <i style={{color:"#c62828", fontSize:"3em"}} className="fas fa-tools"></i>
                        </Marker>
                })}
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
// function mapStateToProps(state) {
//     return( {
//         auth: state.auth,
//         searches: state.queries.results,
//     })
// }
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators( {
//     }, dispatch)
// }
export default Map;
