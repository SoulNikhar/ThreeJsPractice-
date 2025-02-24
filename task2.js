import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(0, 3, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(-5, 8, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 3, 10, Math.PI / 6, 0.5);
spotLight.position.set(0, 1, 0);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 4096;
spotLight.shadow.mapSize.height = 4096;
scene.add(spotLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
floor.receiveShadow = true;
scene.add(floor);

const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(), material1);
mesh1.position.set(-4, 1, 0);
scene.add(mesh1);

const material2 = new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.8 });
const mesh2 = new THREE.Mesh(new THREE.BoxGeometry(), material2);
mesh2.position.set(-1.5, 1, 0);
mesh2.castShadow = true;
scene.add(mesh2);

const material3 = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 200 });
const mesh3 = new THREE.Mesh(new THREE.BoxGeometry(), material3);
mesh3.position.set(1.5, 1, 0);
mesh3.castShadow = true;
scene.add(mesh3);

const material4 = new THREE.MeshPhysicalMaterial({ color: 0xffff00, roughness: 0.2, metalness: 0.7 });
const mesh4 = new THREE.Mesh(new THREE.BoxGeometry(), material4);
mesh4.position.set(4, 1, 0);
mesh4.castShadow = true;
scene.add(mesh4);

const gui = new GUI();
const lightFolder = gui.addFolder('Light Controls');
lightFolder.add(ambientLight, 'intensity', 0, 10, 0.01).name('Ambient Light');
lightFolder.add(pointLight, 'intensity', 0, 10, 0.01).name('Point Light');
lightFolder.add(directionalLight, 'intensity', 0, 10, 0.01).name('Directional Light');
lightFolder.add(spotLight, 'intensity', 0, 10, 0.01).name('Spot Light');
lightFolder.open();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();