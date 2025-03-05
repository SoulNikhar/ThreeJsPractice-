import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 500, 700);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


const shape = new THREE.Shape();
const rectWidth = 500, rectHeight = 300;
shape.moveTo(-rectWidth / 2, -rectHeight / 2);
shape.lineTo(rectWidth / 2, -rectHeight / 2);
shape.lineTo(rectWidth / 2, rectHeight / 2);
shape.lineTo(-rectWidth / 2, rectHeight / 2);
shape.lineTo(-rectWidth / 2, -rectHeight / 2);


const radius = 50;
const holePositions = [
    [-175, 75], [0, 75], [170, 75],
    [-175, -75], [0, -75], [170, -75]
];


holePositions.forEach(([x, y]) => {
    const hole = new THREE.Path();
    hole.absarc(x, y, radius, 0, Math.PI * 2);
    shape.holes.push(hole);
});


const extrudeSettings = {
    depth: 2,
};
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: false });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
