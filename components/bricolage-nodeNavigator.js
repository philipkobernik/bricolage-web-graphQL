import Link from 'next/link'
import React, { Component } from "react";

import { setup, draw, mousePressed, mouseDragged, mouseReleased, windowResized } from '../sketches/node-navigator.js'

export default class BricolageNodeNavigator extends Component {
  constructor(props) {
      super(props)
      this.props = props
      this.canvasParentRef = React.createRef()
      this.setup = setup;

      this.sketchEvents = {};
      this.sketchEvents["draw"] = draw;
      this.sketchEvents["mousePressed"] = mousePressed;
      this.sketchEvents["mouseDragged"] = mouseDragged;
      this.sketchEvents["mouseReleased"] = mouseReleased;
      this.sketchEvents["windowResized"] = windowResized;
  }

  componentDidMount(){
    const p5 = require("p5")
    this.sketch = new p5( _p5 => {
      _p5.setup = () => {
        this.setup(_p5, this.canvasParentRef.current, this.props);
      };
      const p5Events = [
        "draw",
        "preload",
        "mouseClicked",
        "doubleClicked",
        "mouseMoved",
        "mousePressed",
        "mouseWheel",
        "mouseDragged",
        "mouseReleased",
        "keyPressed",
        "keyReleased",
        "keyTyped",
        "touchStarted",
        "touchMoved",
        "touchEnded",
        "deviceMoved",
        "deviceTurned",
        "deviceShaken"
      ];

      p5Events.forEach(event => {
        if (this.sketchEvents[event]) {
          _p5[event] = () => {
              this.sketchEvents[event](_p5); // most of the events only need the _p5 instance
          };
        }
      });

      // windowResized event needs a reference to the current dom element
      // so we'll make sure it gets the dom element whenever it gets called
      _p5["windowResized"] = () => {
          this.sketchEvents["windowResized"](_p5, this.canvasParentRef.current);
      };

    })
  }

  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    this.sketch.remove();
  }
  render() {
    return <div ref={this.canvasParentRef} className={this.props.className || "react-p5"} style={this.props.style || {}} />;
  }
}
