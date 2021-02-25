import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import coding from './facetruth-header.jpg';
const Logo = () =>{
	return(
		<div className = 'ma4 mt0 center'>
			<Tilt className="Tilt" options={{ max : 30 }} style={{ height: 250, width: 250}} >
 				<div className="Tilt-inner"><img height='200em' alt='logo' src={coding}/> </div>
			</Tilt>
		</div>
		);
}

export default Logo;