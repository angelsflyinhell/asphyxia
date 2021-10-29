import './style.css'

import *  as THREE from 'three'
import {getHostRotSpeed, getHostSize} from "./utils/sizes";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {AfterimagePass} from "three/examples/jsm/postprocessing/AfterimagePass";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 2)
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

// host
const hostSize = getHostSize(window)
const geometry = new THREE.BoxGeometry(hostSize, hostSize, hostSize);
const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

const cbb = new THREE.CylinderBufferGeometry(2, 2, 2, 1, 5, true);
cbb.computeBoundingBox();
const matShader = new THREE.ShaderMaterial({
    uniforms: {
        color1: {
            value: new THREE.Color("purple")
        },
        color2: {
            value: new THREE.Color("red")
        },
        bboxMin: {
            value: cbb.boundingBox.min
        },
        bboxMax: {
            value: cbb.boundingBox.max
        }
    },
    vertexShader: `
    uniform vec3 bboxMin;
    uniform vec3 bboxMax;
  
    varying vec2 vUv;

    void main() {
      vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
    wireframe: false
});
const cube = new THREE.Mesh(geometry, matShader);
cube.material.transparent = true
scene.add(cube);

//stuff
const rotater = new THREE.BoxGeometry(hostSize * 10, hostSize * 10, hostSize * 10)
const rotObj = new THREE.Mesh(rotater, matShader)
scene.add(rotObj)

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const afterImg = new AfterimagePass(0.99)
composer.addPass(afterImg)

//animation runtime
animate()

function animate() {
    const frame = requestAnimationFrame(animate)

    composer.render();

    const hrs = getHostRotSpeed()
    cube.rotation.x += hrs;
    cube.rotation.y += hrs;

    let x = 5;
    if (frame % 2 === 0) {
        cube.position.set(x % 0.005, -(-0.2 * x % 0.005 ^ 2 + 0.1 * x % 6 - 0.005), -(x % 15))
    } else {
        cube.position.set(x % 0.005, -(-0.2 * x % 0.005 ^ 2 + 0.1 * x % 6 - 0.005), -(x % 15))
    }
    camera.rotation.z += 0.01

    rotObj.rotation.x += hrs
    rotObj.rotation.y += hrs
    rotObj.rotation.z += hrs
    //
    // let sign = false;
    // if (rotObj.scale.x > 8) {
    //     sign = true
    // }
    // if (rotObj.scale.x < 1) {
    //     sign = false
    // }
    //
    // let growth
    // if (sign)
    //     growth = rotObj.scale.x + 0.01
    // else
    //     growth = rotObj.scale.x - 0.01
    // rotObj.scale.set(growth, growth, growth)
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})