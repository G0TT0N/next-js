import React, { Fragment, Component } from 'react'
import './location.css';


export default class Location extends Component {
  componentDidMount() {
    const location = this.props.location;
    if(!location) return;
    const url = `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`
  
    const iFrameTest = document.createElement("iframe");
    iFrameTest.setAttribute("src", url);
    iFrameTest.setAttribute("frameborder", "0");
    iFrameTest.setAttribute("scrolling", 'no');
    iFrameTest.setAttribute("marginheight", "0");
    iFrameTest.setAttribute("marginwidth", "0");
    iFrameTest.style.width = "640px";
    iFrameTest.style.height = "480px";
    document.getElementById("map").appendChild(iFrameTest);
  }
  
  render() {
  return (
      <Fragment>
        <div className={"popup"}  onClick={this.props.hideLocation}>
          <div className={"popup_container"} id={"map"}>
            <h1>Location</h1>
            {this.props.location || 'Location is unavailable'}
          </div>
        </div>
        
        <div className="wrapper"/>
      </Fragment>
    )
  }
};


