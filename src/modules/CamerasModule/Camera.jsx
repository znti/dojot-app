import React, { Component } from 'react';

import Placeholder from './webrtc.png';
import TransparentBg from './transparent-1px.png';
import Spinner from './spinner.gif';

import kurentoUtils from 'kurento-utils';

//var ws = new WebSocket('wss://10.202.22.40/helloworld');
// var ws;// = new WebSocket('wss://localhost:8443/helloworld');
// var videoOutput;
// var this.state.webRtcPeer;
// let videoOutputId;

export default class CamerasModule extends Component {

	constructor(props) {
		super(props);

		console.log('WS requested from', props.wsAddress);

		let videoOutputId = `videoOut_${props.cameraId}`

		console.log('Output ID being set as', videoOutputId); 

		let ws = new WebSocket(props.wsAddress);

		ws.onmessage = (message) => {
		  var parsedMessage = JSON.parse(message.data);
//		  console.info('Received message: ' + message.data);
		
		  switch (parsedMessage.id) {
		    case 'startResponse':
					console.log('Got startResponse');
		      this.startResponse(parsedMessage);
		      break;
		    case 'error':
					console.log('Got error');
		      this.onError('Error message from server: ' + parsedMessage.message);
		      break;
		    case 'iceCandidate':
					console.log('Got iceCandidate');
		      this.state.webRtcPeer.addIceCandidate(parsedMessage.candidate)
		      break;
		    default:
					console.log('Got default');
		      this.onError('Unrecognized message', parsedMessage);
		  }
		}

		this.state = {
			streamIsOn: false,
			videoOutputId,
			ws,
		}



	}


	componentDidMount() {
		let videoOutput = this.refs[this.state.videoOutputId];
		this.setState({videoOutput})

	}

	componentWillUnmount() {
		console.log('Unmounting');
		this.stop();
	}

	start = () => {
	  console.log('Starting video call ...')
	
		let videoOutput = this.refs[this.state.videoOutputId];
	
		console.log('VIDEO OUTPUT is:', videoOutput);
	
		let constraints = {
			audio: false,
			video: {
	    	width: 120,
	    	framerate: 1
	   	}
		}
	
	  var options = {
	    remoteVideo: videoOutput,
	    onicecandidate: this.onIceCandidate,
		  mediaConstraints: constraints,
	  }
	
	  let webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, (error) => {
	    if (error) return this.onError(error);
	
	    webRtcPeer.generateOffer(this.onOffer);
	  });

		this.setState({streamIsOn : true, webRtcPeer}, () => {
	  	this.showSpinner();
		});
	
	}
	
	onIceCandidate = (candidate) => {
	  console.log('Local candidate' + JSON.stringify(candidate));
	
	  var message = {
	    id: 'onIceCandidate',
	    candidate: candidate
	  };
	  this.sendMessage(message);
	}
	
	onOffer = (error, offerSdp) => {
	  if (error) return this.onError(error);
	
	  console.info('Invoking SDP offer callback function ');
	  var message = {
	    id: 'start',
	    sdpOffer: offerSdp
	  }
	
	  this.sendMessage(message);
	}
	
	onError = (error) => {
	  console.error(error);
	  this.stop();
	}
	
	startResponse = (message) => {
	  console.log('SDP answer received from server. Processing ...');
	  this.state.webRtcPeer.processAnswer(message.sdpAnswer);
	}
	
	stop = () => {
	  console.log('Stopping video call ...');
	  if (this.state.webRtcPeer) {
	    this.state.webRtcPeer.dispose();
	    this.setState({webRtcPeer: null});
	
	    var message = {
	      id: 'stop'
	    }
	    this.sendMessage(message);
	  }
		this.setState({streamIsOn : false});
	  this.hideSpinner();
	}
	
	sendMessage = (message) => {
	  var jsonMessage = JSON.stringify(message);
	  console.log('Sending message: ' + jsonMessage);
	  this.state.ws.send(jsonMessage);
	}
	
	showSpinner = () => {
		let videoOutput = this.state.videoOutput;
		console.log('showing spinner on', videoOutput);
		videoOutput.poster = TransparentBg; //'./transparent-1px.png';
		videoOutput.style.background = `center transparent url(${Spinner}) no-repeat`;
		console.log('now with videoOutput:', videoOutput);
		this.setState({videoOutput})
	}
	
	hideSpinner = () => {
		let videoOutput = this.state.videoOutput;
		console.log('hiding spinner on', videoOutput);
	  videoOutput.src = '';
	  videoOutput.poster = Placeholder;
	  videoOutput.style.background = '';
		console.log('now with', videoOutput);
		this.setState({videoOutput})
	}
	
	render() {
		console.log('Rendering LoginModule', this.props);

		return (
			<div>
				<div><h3>{this.props.cameraLabel}</h3>
				<input type="button" disabled={this.state.streamIsOn} value="Start" onClick={this.start}/>
				<input type="button" disabled={!this.state.streamIsOn} value="Stop" onClick={this.stop}/>
        </div><video id={this.state.videoOutputId} ref={this.state.videoOutputId} autoPlay width="720px" height="405px" poster={Placeholder}></video>
      </div>

		);
	}
}
