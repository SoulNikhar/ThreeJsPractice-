import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(450, 280, -290);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const origin = new THREE.Vector3(10, 0, 0);
const lengthBottom = 200;
const lengthTop = 120;
const height = 100;
const offset = (lengthBottom - lengthTop) / 2;

const shape = new THREE.Shape();
shape.moveTo(origin.x, origin.y);
shape.lineTo(origin.x + lengthBottom, origin.y);
shape.lineTo(origin.x + lengthBottom - offset, origin.y + height);
shape.lineTo(origin.x + offset, origin.y + height);
shape.lineTo(origin.x, origin.y);

const extrudeSettings = {
  depth: 30,
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  roughness: 0.4,
  metalness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, edgeMaterial);
scene.add(line);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 100, 100);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
