import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FaceRecogonition.css';
const FaceRecogonition = ({imageUrl, box}) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2 mb2'>
			<img id='inputImage' alt='' src = {imageUrl} width='300px' height='auto'/>
			<div className='bounding_box' style = {{left : box.leftCol, top:box.topRow, right: box.rightCol, bottom: box.bottomRow}}></div>
			</div>
		</div>
		);
}
export default FaceRecogonition;