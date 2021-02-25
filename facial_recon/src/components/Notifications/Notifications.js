import React, { Component } from "react";
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import "./Notifications.css";

class Notifications extends Component{
	componentDidMount(){
		store.addNotification({
			title: "Error",
			  message: this.props.message,
			  type: "danger",
			  insert: "top",
			  container: "top-left",
			  animationIn: ["animate__animated", "animate__fadeIn"],
			  animationOut: ["animate__animated", "animate__fadeOut"],
			  dismiss: {
			    duration: 1000,
			    onScreen: true,
			    showIcon: true,
			    pauseOnHover:false
			  }});
	}

	componentDidUpdate(){
		this.props.errorController('');
	}
	render(){
	return(
		<div id="notifications">
		<ReactNotifications/>
		</div>
	);
}
}

export default Notifications;