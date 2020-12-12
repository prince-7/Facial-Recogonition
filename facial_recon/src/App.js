import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecogonition from './components/FaceRecogonition/FaceRecogonition';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai';
import tachyons from 'tachyons';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey : '53370ab6e75f439f83dad09d861a53b2'
});

const ParticlesParams = {
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 10,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 30,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: true,
    }
class App extends Component {
	constructor(){
		super();
		this.state = {
			input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false
		}
	}

  calculateFaceLocation = (data) => {
    console.log(data);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(height,width);
    for(var i=0;i<data.length;i++){
      const clarifaiFace = data[i].region_info.bounding_box ; 
          return{

            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol : width - (clarifaiFace.right_col*width),
            bottomRow : height - (clarifaiFace.bottom_row*height)
    }
  }

  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

	onInputChange = (event) => {
    this.setState({input : event.target.value});
	}

  onRouteChange = (route) =>
  {
    if(route==='signin'){
      this.setState({isSignedIn:false})
    }
    else if (route ==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

	onButtonSubmit = () =>
	{
    //here we have to give this.state.input to the model, giving this.state.imageUrl would result in error.
    this.setState({imageUrl:this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions)))
    .catch(err => console.log(err));
  }

  render(){
    return(
      <div className="App">
      <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn} />
      <Particles 
        className='particles'
        params = {ParticlesParams}
        />
        {this.state.route === 'home' 
        ? <div> 
        <Logo className='Logo' />
        <Rank/>
        <ImageLinkForm 
        	onInputChange={this.onInputChange} 
        	onButtonSubmit={this.onButtonSubmit}
        	/>
          <FaceRecogonition imageUrl={this.state.imageUrl} box = {this.state.box}/>
          </div>
          : (
          this.state.route === 'signin' 
          ? <Signin onRouteChange = {this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
