import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI;

const params = {
    width: 1,
    height: 1,
    depth: 1,
    color: 0x00ff00,
};

let geometry = new THREE.BoxGeometry(params.width, params.height, params.depth);
let material = new THREE.MeshBasicMaterial({ color: params.color, wireframe: true });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const gui = new GUI();
gui.add(params, 'width', 0.5, 5).onChange(updateCube);
gui.add(params, 'height', 0.5, 5).onChange(updateCube);
gui.add(params, 'depth', 0.5, 5).onChange(updateCube);
gui.addColor(params, 'color').onChange(updateColor);

function updateCube() {
    scene.remove(cube);
    geometry = new THREE.BoxGeometry(params.width, params.height, params.depth);
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function updateColor(value) {
    cube.material.color.set(value);
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
