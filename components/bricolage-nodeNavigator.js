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
    this.sketch = new p5( p => {
      p.setup = () => {
        this.setup(p, this.canvasParentRef.current, this.props);
      };
      const p5Events = [
        "draw",
        "windowResized",
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
          p[event] = () => {
              this.sketchEvents[event](p);
          };
        }
      });

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
