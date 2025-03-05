




// ----------------- Dynamic Way -----------------






import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, 500, 700);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


const rectWidth = 1000, rectHeight = 900;
const shape = new THREE.Shape();
shape.moveTo(-rectWidth / 2, -rectHeight / 2);
shape.lineTo(rectWidth / 2, -rectHeight / 2);
shape.lineTo(rectWidth / 2, rectHeight / 2);
shape.lineTo(-rectWidth / 2, rectHeight / 2);
shape.lineTo(-rectWidth / 2, -rectHeight / 2);


const radius = 10;
const cols = 3; 
const rows = 4; 

const colSpacing = rectWidth / (cols + 1);  
const rowSpacing = rectHeight / (rows + 1); 


for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const x = -rectWidth / 2 + (j + 1) * colSpacing;
        const y = -rectHeight / 2 + (i + 1) * rowSpacing;
        const hole = new THREE.Path();
        hole.absarc(x, y, radius, 0, Math.PI * 2);
        shape.holes.push(hole);
    }
}


const extrudeSettings = {
    depth: 20,
};
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: false });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();















// ----------------- Hard code Way -----------------
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
// camera.position.set(0, 50, 700);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);


// const shape = new THREE.Shape();
// const rectWidth = 500, rectHeight = 300;
// shape.moveTo(-rectWidth / 2, -rectHeight / 2);
// shape.lineTo(rectWidth / 2, -rectHeight / 2);
// shape.lineTo(rectWidth / 2, rectHeight / 2);
// shape.lineTo(-rectWidth / 2, rectHeight / 2);
// shape.lineTo(-rectWidth / 2, -rectHeight / 2);


// const radius = 50;
// const holePositions = [
//     [-175, 75], [0, 75], [170, 75],
//     [-175, -75], [0, -75], [170, -75]
// ];


// holePositions.forEach(([x, y]) => {
//     const hole = new THREE.Path();
//     hole.absarc(x, y, radius, 0, Math.PI * 2);
//     shape.holes.push(hole);
// });


// const extrudeSettings = {
//     depth: 200,
// };
// const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
// const material = new THREE.MeshBasicMaterial({ 
//     color: 0x0077ff, 
//     wireframe: false,
//     side: THREE.DoubleSide
// });


// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);


// window.addEventListener('resize', () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
// });


// function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// }
// animate();
