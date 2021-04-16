import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

// post-processing
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import * as dat from 'dat.gui';
import gsap from 'gsap';

import './styles/global.scss';
import { TetrahedronBufferGeometry } from 'three';

// import vertex from './shader/vertexParticles.glsl';
// import fragment from './shader/fragment.glsl';

export default class Scenario {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom; // document.getElementById('webgl')
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.physicallyCorrectLights = true;

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      5000
    );

    this.camera.position.set(0, 0, 1500);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.clock = 0;

    this.isPlaying = true;

    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    this.settings();

    // starts the webgl animations!
      
    // animate with interactity
   
  }

  settings() {
    let that = this;
    this.settings = {
      distortion: 0.09,
      bloomStrength: 0.69,
    };

    this.gui = new dat.GUI();
    
    this.gui.add(this.settings, 'distortion', 0, 3, 0.01);
    
    this.gui.add(this.settings, 'bloomStrength', 0, 5, 0.01);
  
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.updateProjectionMatrix();
    // this.composer.setSize(this.width, this.height);
  }

  addObjects() {
    let that = this;

    this.material = new THREE.PointsMaterial( { color: 0x888888 } )

    this.geometry = new THREE.PlaneBufferGeometry(
      480 * 1.75,
      820 * 1.75,
      480,
      820
    );

    this.plane = new THREE.Points(this.geometry, this.material);

    this.scene.add(this.plane);

    this.light = new THREE.AmbientLight('0x888888', 1)

    this.scene.add(this.light)
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.render();
      this.isPlaying = true;
    }
  }

  render() {
    if (!this.isPlaying) return;

    this.clock += 0.05;
  
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera); 
  }
}

// instantiate the scenario class
new Scenario({
  dom: document.getElementById('webgl'),
});
