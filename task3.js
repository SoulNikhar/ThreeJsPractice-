import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 150, 150);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


const shape = new THREE.Shape();
const rectWidth = 500, rectHeight = 300;
shape.moveTo(-rectWidth / 2, -rectHeight / 2);
shape.lineTo(rectWidth / 2, -rectHeight / 2);
shape.lineTo(rectWidth / 2, rectHeight / 2);
shape.lineTo(-rectWidth / 2, rectHeight / 2);
shape.lineTo(-rectWidth / 2, -rectHeight / 2);

const radius = 50;
const hole1 = new THREE.Path();
// const hole2 = new THREE.Path();
// const hole3 = new THREE.Path();
// const hole4 = new THREE.Path();
// const hole5 = new THREE.Path();
// const hole6 = new THREE.Path();
hole1.absarc(-7, 3.5, radius, 0, Math.PI * 2);
// hole2.absarc(0, 3.5, radius, 0, Math.PI * 2);
// hole3.absarc(7, 3.5, radius, 0, Math.PI * 2);
// hole4.absarc(-7, -3.5, radius, 0, Math.PI * 2);
// hole5.absarc(0, -3.5, radius, 0, Math.PI * 2);
// hole6.absarc(7, -3.5, radius, 0, Math.PI * 2);
shape.holes.push(hole1);
// shape.holes.push(hole2);
// shape.holes.push(hole3);
// shape.holes.push(hole4);
// shape.holes.push(hole5);
// shape.holes.push(hole6);

// const hole1points = hole1.getPoints();
// console.log(hole1points);


const extrudeSettings = {
    depth:200,
    bevelEnabled: true,
    wireframe: true,
};
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: false });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const position = geometry.attributes.position.array;
// for (let index = 0; index < position.length; index += 3) {
//     console.log(position[index]);
// }


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
