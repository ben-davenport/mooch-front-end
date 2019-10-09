import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Tool.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faStar);

class Tool extends Component {
    render() {
    console.log(this.props.tool);
    const tool = this.props.tool;
    return(
        <div className="col s12 waypoint">
            <Link to={`/tool/${tool.id}`}>
                <div className="large-pic">
                    <img src={`${window.apiHost}${tool.imageUrl}`} />
                </div>
                <div className="info">
                    <div className="listing-details">{tool.location}</div>
                    <div className="title">{tool.title}</div>
                    <div className="price">${tool.pricePerNight} per night</div>
                    <div className="reviews">
                        <span className="stars"><FontAwesomeIcon icon="star" size="1x"/></span>
                        <span className="review-total">309 </span>
                    </div>
                </div>
        
            </Link>
        </div>
      )
  }

}

export default Tool;
