import * as THREE from "three";
import { CSG } from "three-csg-ts";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(9, 9, 9);
scene.add(light);

const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xfffff, wireframe: true });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
sphereGeometry.translate(1, 0, 0);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, wireframe: true });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);


const csgBox = CSG.fromMesh(boxMesh, 0);
const csgSphere = CSG.fromMesh(sphereMesh, 0);
const resultCSG = csgBox.subtract(csgSphere);


const resultMesh = CSG.toMesh(resultCSG, new THREE.Matrix4());
scene.add(resultMesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
