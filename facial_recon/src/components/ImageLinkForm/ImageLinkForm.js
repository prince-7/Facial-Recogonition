import React from 'react';
import Notifications from '../../components/Notifications/Notifications';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return(
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your picture'}
			</p>
			<div className='center'>
				<input className='form f4 pa2 w-30' type='tex' onChange={onInputChange} />
				<button className='w-10 grow f4 link ph3 pv2 dib white bg-light-purple'
				onClick={onButtonSubmit}>Detect</button>
			</div>
		</div>
	);
}

export default ImageLinkForm;